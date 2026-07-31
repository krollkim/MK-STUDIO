#!/usr/bin/env node
/**
 * One-off asset pipeline: takes the raw client folder ("מתן - תכנים") and emits
 * web-ready files into public/ with clean ASCII names.
 *
 *   - HEIC (incl. .png/.HEIC files that are really HEIC) -> JPEG, then WebP.
 *   - Oversized PNG/JPG photos -> resized WebP + JPEG fallback.
 *   - WhatsApp testimonial screenshots -> cropped to the quotable message only
 *     (this is also what removes the phone number / prior conversation).
 *
 * Run:  node scripts/prepare-assets.mjs
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import heicConvert from 'heic-convert'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'מתן - תכנים')
const IMAGES = path.join(ROOT, 'public', 'images')
const PROOF = path.join(ROOT, 'public', 'proof')

/** HEIC magic bytes appear at offset 4 ("ftyp" + a heic/heix/mif1 brand). */
async function isHeic(file) {
  const handle = await fs.open(file, 'r')
  try {
    const { buffer } = await handle.read({ buffer: Buffer.alloc(16), position: 0 })
    const brand = buffer.subarray(8, 12).toString('latin1')
    return buffer.subarray(4, 8).toString('latin1') === 'ftyp' &&
      ['heic', 'heix', 'mif1', 'msf1', 'hevc'].includes(brand)
  } finally {
    await handle.close()
  }
}

/** Decode to a sharp instance regardless of whether the file is HEIC or not. */
async function load(file) {
  if (await isHeic(file)) {
    const jpeg = await heicConvert({
      buffer: await fs.readFile(file),
      format: 'JPEG',
      quality: 0.94,
    })
    return sharp(Buffer.from(jpeg))
  }
  return sharp(file)
}

/**
 * Write a photo as WebP + JPEG at a max width, preserving aspect ratio.
 * Both formats are emitted so <picture> can fall back on old Safari.
 */
async function photo(srcFile, outName, { width = 1800, quality = 82 } = {}) {
  const img = (await load(srcFile)).rotate().resize({
    width,
    withoutEnlargement: true,
  })
  await img.clone().webp({ quality }).toFile(path.join(IMAGES, `${outName}.webp`))
  await img.clone().jpeg({ quality, mozjpeg: true }).toFile(path.join(IMAGES, `${outName}.jpg`))
  const meta = await sharp(path.join(IMAGES, `${outName}.jpg`)).metadata()
  console.log(`  ${outName}  ${meta.width}x${meta.height}`)
}

/** Transparent-friendly graphic: keep PNG, just downscale. */
async function graphic(srcFile, outName, width = 1400) {
  const img = (await load(srcFile)).rotate().resize({ width, withoutEnlargement: true })
  await img.clone().png({ compressionLevel: 9 }).toFile(path.join(IMAGES, `${outName}.png`))
  await img.clone().webp({ quality: 90 }).toFile(path.join(IMAGES, `${outName}.webp`))
  console.log(`  ${outName} (graphic)`)
}

/**
 * Crop a WhatsApp screenshot down to the message we actually want to show.
 * `box` is in ORIGINAL pixel coordinates: { left, top, width, height }.
 */
async function screenshot(srcFile, outName, box) {
  await sharp(srcFile)
    .extract(box)
    .png({ compressionLevel: 9 })
    .toFile(path.join(PROOF, `${outName}.png`))
  console.log(`  ${outName}  ${box.width}x${box.height}`)
}

async function main() {
  await fs.mkdir(IMAGES, { recursive: true })
  await fs.mkdir(PROOF, { recursive: true })

  const pics = path.join(SRC, 'תמונות')

  console.log('photos:')
  // "2.png" is really a HEIC — the hero frame.
  await photo(path.join(pics, '2.png'), 'hero-studio', { width: 2200 })
  await photo(path.join(pics, 'הקלטה באולפן.png'), 'recording-session')
  await photo(path.join(pics, 'הקלטת גיטרות באולפן.HEIC'), 'guitar-session')
  // Studio build sequence (chronological): shell -> acoustics -> finished room.
  await photo(path.join(pics, 'אולפן בבנייה המשך.HEIC'), 'studio-build-1')
  await photo(path.join(pics, 'אולפן בבנייה.jpg'), 'studio-build-2')
  await photo(path.join(pics, 'אולפן-סופי.png'), 'studio-final')

  console.log('graphics:')
  await graphic(path.join(pics, 'אולפן שם ועריכה.PNG'), 'studio-brandmark')

  console.log('testimonial screenshots (cropped):')
  const proofSrc = path.join(SRC, 'המלצות')
  // Karin — crop excludes the header row, which held her phone number.
  await screenshot(path.join(proofSrc, 'הודעת המלצה קרין.png'), 'review-karin', {
    left: 256, top: 640, width: 900, height: 600,
  })
  // Amit Igar — one long message, split into its two quotable halves so each
  // sticker stays readable at the marquee's fixed height.
  await screenshot(path.join(proofSrc, 'המלצה איגר.png'), 'review-igar-1', {
    left: 264, top: 1398, width: 866, height: 292,
  })
  await screenshot(path.join(proofSrc, 'המלצה איגר.png'), 'review-igar-2', {
    left: 264, top: 1885, width: 866, height: 205,
  })
  // Naftali — crop keeps ONLY the testimonial; the earlier conversation
  // (which the client asked to obscure) is cropped away entirely.
  await screenshot(
    path.join(proofSrc, 'לטשטש את השיחה לפני 😂, המלצה לימודי גיטרה מנפתלי.png'),
    'review-naftali',
    { left: 316, top: 1366, width: 820, height: 300 }
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
