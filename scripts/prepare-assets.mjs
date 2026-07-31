#!/usr/bin/env node
/**
 * Asset pipeline: takes the raw client folder ("מתן - תכנים") and emits every
 * web-ready file in public/, with clean ASCII names. Re-runnable — nothing in
 * public/ is hand-made, so this is the single source of how it was produced.
 *
 *   - HEIC (incl. .png/.HEIC files that are really HEIC) -> JPEG, then WebP.
 *   - Oversized PNG/JPG photos -> resized WebP + JPEG fallback.
 *   - WhatsApp testimonial screenshots -> cropped to the quotable message only
 *     (this is also what removes the phone number / prior conversation).
 *   - Video -> 1080p H.264 + faststart, plus a poster frame. The source
 *     "מי אני" clip is 3840x2160 at 78 Mbps (592MB); shipping it untouched
 *     would be a non-starter, this brings it to ~6.5MB.
 *
 * Run:  node scripts/prepare-assets.mjs
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import sharp from 'sharp'
import heicConvert from 'heic-convert'
import ffmpeg from 'ffmpeg-static'

const run = promisify(execFile)

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'מתן - תכנים')
const IMAGES = path.join(ROOT, 'public', 'images')
const PROOF = path.join(ROOT, 'public', 'proof')
const VIDEO = path.join(ROOT, 'public', 'video')

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

/** Transcode to web-safe 1080p H.264. `+faststart` puts the moov atom first
 *  so playback can begin before the whole file has downloaded. */
async function video(srcFile, outFile) {
  await run(ffmpeg, [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-i', srcFile,
    '-vf', 'scale=1920:-2',
    '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '23',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '128k', '-ac', '2',
    outFile,
  ])
  const { size } = await fs.stat(outFile)
  console.log(`  ${path.basename(outFile)}  ${(size / 1048576).toFixed(1)}MB`)
}

/** Grab a still for the <video poster>, so nothing downloads until play. */
async function poster(srcFile, outFile, seconds = 2) {
  await run(ffmpeg, [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-ss', String(seconds), '-i', srcFile,
    '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '4',
    outFile,
  ])
  console.log(`  ${path.basename(outFile)}`)
}

async function main() {
  await fs.mkdir(IMAGES, { recursive: true })
  await fs.mkdir(PROOF, { recursive: true })
  await fs.mkdir(VIDEO, { recursive: true })

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
  // Amit Igar — the whole message in one piece, timestamp included. It is the
  // longest of the three and that is fine: the marquee sizes each sticker to
  // its own content, so nothing needs trimming to a common height.
  await screenshot(path.join(proofSrc, 'המלצה איגר.png'), 'review-igar', {
    left: 264, top: 1398, width: 866, height: 900,
  })
  // Naftali — crop keeps ONLY the testimonial; the earlier conversation
  // (which the client asked to obscure) is cropped away entirely.
  await screenshot(
    path.join(proofSrc, 'לטשטש את השיחה לפני 😂, המלצה לימודי גיטרה מנפתלי.png'),
    'review-naftali',
    { left: 316, top: 1366, width: 820, height: 300 }
  )

  console.log('video:')
  const storySrc = path.join(SRC, 'וידאו', 'מתן סרטון מי אני - לדף נחיתה.mp4')
  await video(storySrc, path.join(VIDEO, 'matan-story.mp4'))
  await poster(path.join(VIDEO, 'matan-story.mp4'), path.join(VIDEO, 'matan-story-poster.jpg'))

  // The two testimonial clips are already small and phone-shot; they only
  // need poster frames, so they are copied through untouched.
  const testimonialSrc = path.join(SRC, 'המלצות')
  for (const [from, to] of [
    ['המלצה על לימוד גיטרה אור.mp4', 'testimonial-or'],
    ['סרטון המלצה תאיר.mp4', 'testimonial-tair'],
  ]) {
    const out = path.join(PROOF, `${to}.mp4`)
    await fs.copyFile(path.join(testimonialSrc, from), out)
    await poster(out, path.join(PROOF, `${to}-poster.jpg`), 1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
