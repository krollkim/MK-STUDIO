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
    // Shot landscape (832×464), so the 9:16 frame keeps only ~31% of the
    // width. Tair sits at ~72% across, which a centred crop misses entirely.
    objectPosition: '82% center',
  },
  // Third slot — intentionally empty until the next video testimonial arrives.
  { name: 'הבא בתור', role: 'הסרטון הבא יכול להיות שלך' },
]

/**
 * The marquee repeats this list on its own until one block overflows the
 * container, so there is no gap even with a handful of reviews — just add
 * entries here, no duplication needed.
 */
const REVIEWS: Testimonial[] = [
  {
    image: '/proof/review-karin.png',
    imageAlt:
      'הודעת תודה בוואטסאפ מקרין: "תודה רבה לך באמת על הכל, על הזמן והרצון. ממש הצלת אותי מפלייבק דפוק לפלייבק מאוד מאוד יפה"',
  },
  {
    image: '/proof/review-igar.png',
    imageAlt:
      'הודעת וואטסאפ מעמית איגר: "האולפן שהשכרתי היה מטורף, איזה ציוד ברמה גבוהה זה לא יאמן. כל ההקלטות יצאו מטורף, הקלטנו גם ווקלים וגם גיטרות, והאקוסטיקה הייתה פשוט מדהימה"',
  },
  {
    image: '/proof/review-naftali.png',
    imageAlt:
      'הודעת וואטסאפ מנפתלי: "הוצאתי אתמול גיטרה מול כל החברה וניגנתי איזה שעה! אתה מלך ואלוף"',
  },
]

export default function Proof() {
  return (
    // The silver ombré lives on the wrapper so the section keeps its place in
    // the alternating down/up chain; the component itself stays transparent.
    <div id="proof" className="silver-light">
      <SocialProofSection
        eyebrow={PROOF.eyebrow}
        heading={PROOF.title}
        videos={VIDEOS}
        testimonials={REVIEWS}
        background="transparent"
        speed={45}
        placeholder={{ title: 'מקום שמור', subtitle: 'לסרטון ההמלצה הבא' }}
      />
    </div>
  )
}
