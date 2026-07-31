import SocialProofSection, {
  type Testimonial,
  type VideoTestimonial,
} from '@/components/SocialProofSection'
import { PROOF } from '@/lib/content'

/**
 * Section 6 — social proof. Renders the existing SocialProofSection component;
 * everything here is data, so adding proof later is a one-line change.
 *
 * ➕ TO ADD THE THIRD VIDEO: drop the file in /public/proof and fill in the
 *    empty third entry of VIDEOS below (src / poster / name / role / duration).
 * ➕ TO ADD MORE WRITTEN REVIEWS: crop the screenshot into /public/proof and
 *    push an { image, imageAlt } object onto REVIEWS.
 */
const VIDEOS: VideoTestimonial[] = [
  {
    src: '/proof/testimonial-or.mp4',
    poster: '/proof/testimonial-or-poster.jpg',
    name: 'אור',
    role: 'תלמיד גיטרה',
    quote: 'למדתי לנגן בלי להרגיש שאני לומד.',
    duration: '0:49',
  },
  {
    src: '/proof/testimonial-tair.mp4',
    poster: '/proof/testimonial-tair-poster.jpg',
    name: 'תאיר',
    role: 'יוצרת',
    quote: 'הגעתי עם מילים, יצאתי עם שיר.',
    duration: '0:37',
  },
  // Third slot — intentionally empty until the next video testimonial arrives.
  { name: 'הבא בתור', role: 'הסרטון הבא יכול להיות שלך' },
]

const REVIEWS: Testimonial[] = [
  {
    image: '/proof/review-karin.png',
    imageAlt: 'הודעת תודה בוואטסאפ מקרין על ההקלטה והפלייבק שהופק באולפן',
  },
  {
    image: '/proof/review-igar-1.png',
    imageAlt: 'הודעת וואטסאפ מעמית איגר: "האולפן שהשכרתי היה מטורף, איזה ציוד ברמה גבוהה"',
  },
  {
    image: '/proof/review-naftali.png',
    imageAlt: 'הודעת וואטסאפ מנפתלי על כך שהוציא גיטרה וניגן שעה מול חברים אחרי השיעורים',
  },
  {
    image: '/proof/review-igar-2.png',
    imageAlt:
      'הודעת וואטסאפ מעמית איגר: "כל ההקלטות יצאו מטורף, והאקוסטיקה הייתה פשוט מדהימה"',
  },
]

/**
 * The marquee holds two copies of whatever it is given. With only a handful of
 * reviews that is narrower than a desktop viewport and a gap appears, so the set
 * is repeated until it is comfortably wider than any screen. Drop the repeat
 * once there are ~8 real reviews.
 */
const MARQUEE: Testimonial[] = [...REVIEWS, ...REVIEWS, ...REVIEWS]

export default function Proof() {
  return (
    <div id="proof" className="border-y border-line">
      <SocialProofSection
        eyebrow={PROOF.eyebrow}
        heading={PROOF.title}
        videos={VIDEOS}
        testimonials={MARQUEE}
        background="#f6f4f1"
        speed={45}
        placeholder={{ title: 'מקום שמור', subtitle: 'לסרטון ההמלצה הבא' }}
      />
    </div>
  )
}
