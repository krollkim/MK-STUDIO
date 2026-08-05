import SocialProofSection, {
  type Testimonial,
  type VideoTestimonial,
} from '@/components/SocialProofSection'
import type { Dictionary } from '@/lib/i18n'

/**
 * Section 6 — social proof. Renders the existing SocialProofSection component;
 * everything here is data, so adding proof later is a one-line change.
 *
 * The media (files, focal points, durations) is language-independent and lives
 * here. Every readable string — names, roles, pull-quotes, image alt text —
 * comes from the dictionary so it exists once per locale.
 *
 * ➕ TO ADD THE THIRD VIDEO: drop the file in /public/proof, fill in the third
 *    entry of VIDEO_MEDIA below, and give it a name/role in both dictionaries.
 * ➕ TO ADD MORE WRITTEN REVIEWS: crop the screenshot into /public/proof, push
 *    it onto REVIEW_IMAGES, and add its alt text to `proof.reviewAlts`.
 */
const VIDEO_MEDIA: { src?: string; poster?: string; duration?: string; objectPosition?: string }[] =
  [
    { src: '/proof/testimonial-or.mp4', poster: '/proof/testimonial-or-poster.jpg', duration: '0:49' },
    {
      src: '/proof/testimonial-tair.mp4',
      poster: '/proof/testimonial-tair-poster.jpg',
      duration: '0:37',
      // Shot landscape (832×464), so the 9:16 frame keeps only ~31% of the
      // width. Tair sits at ~72% across, which a centred crop misses entirely.
      objectPosition: '82% center',
    },
    // Third slot: intentionally empty until the next video testimonial arrives.
    {},
  ]

const REVIEW_IMAGES = [
  '/proof/review-karin.png',
  '/proof/review-igar.png',
  '/proof/review-naftali.png',
]

export default function Proof({ dict }: { dict: Dictionary }) {
  const { proof } = dict

  const videos: VideoTestimonial[] = VIDEO_MEDIA.map((media, i) => ({
    ...media,
    name: proof.videos[i]?.name,
    role: proof.videos[i]?.role,
    quote: proof.videos[i]?.quote,
  }))

  const reviews: Testimonial[] = REVIEW_IMAGES.map((image, i) => ({
    image,
    imageAlt: proof.reviewAlts[i],
  }))

  return (
    // The silver ombré lives on the wrapper so the section keeps its place in
    // the alternating light/deep chain; the component itself stays transparent.
    <div id="proof" className="silver-light">
      <SocialProofSection
        eyebrow={proof.eyebrow}
        heading={proof.title}
        videos={videos}
        testimonials={reviews}
        background="transparent"
        speed={45}
        placeholder={proof.placeholder}
      />
    </div>
  )
}
