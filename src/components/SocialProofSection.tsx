"use client";

/**
 * SocialProofSection
 * ------------------
 * A complete social-proof block in one component:
 *
 *   1. Three "video pillar" testimonials (9:16 portrait, click to play,
 *      only one plays at a time).
 *   2. Below them, a single-row infinite marquee of WhatsApp-style
 *      testimonial "stickers" that pauses on hover. Each sticker sizes
 *      itself to the length of its message.
 *
 * Requirements:
 *   - Tailwind CSS
 *   - gsap   ->  npm i gsap
 *
 * Usage:
 *   import SocialProofSection from "@/components/SocialProofSection";
 *
 *   <SocialProofSection
 *     videos={[
 *       { name: "Marcus Tran", role: "Head of Ops, Northbeam",
 *         src: "/proof/marcus.mp4", poster: "/proof/marcus.jpg",
 *         quote: "We replaced three tools with this one." },
 *       // ...two more
 *     ]}
 *   />
 *
 * Messages: pass `testimonials`. To use real cropped screenshots instead of
 * recreated bubbles, give a testimonial an `image` — it renders the image and
 * ignores the text fields. You can mix images and text bubbles freely:
 *   { image: "/proof/sarah.png", imageAlt: "Message from Sarah" }
 */

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ------------------------------- types ---------------------------------- */

export interface VideoTestimonial {
  /** Video file or URL. Without it the card renders as an empty placeholder. */
  src?: string;
  /** Poster frame shown before play. */
  poster?: string;
  name?: string;
  /** Role / company line under the name. */
  role?: string;
  /** 1–2 letters for the avatar. Falls back to the initials of `name`. */
  initials?: string;
  /** Duration chip, e.g. "0:48". */
  duration?: string;
  /** Avatar background color. Falls back to a rotating palette. */
  color?: string;
  /** Short pull-quote under the video. */
  quote?: string;
}

/** Empty-slot copy, so non-English pages can localize the placeholder card. */
export interface PlaceholderCopy {
  /** First line, e.g. "Video testimonial". */
  title: string;
  /** Second line; `{n}` is replaced with the 1-based slot number. */
  subtitle: string;
}

const DEFAULT_PLACEHOLDER: PlaceholderCopy = {
  title: "Video testimonial",
  subtitle: "slot {n}",
};

export interface Testimonial {
  name?: string;
  initials?: string;
  text?: string;
  /** Timestamp shown in the bubble, e.g. "09:14". */
  time?: string;
  color?: string;
  /** Optional cropped screenshot. When set, the image is shown instead of a bubble. */
  image?: string;
  imageAlt?: string;
}

export interface SocialProofSectionProps {
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  /** Section heading. */
  heading?: string;
  /** The three video testimonials. */
  videos?: VideoTestimonial[];
  /** Messages in the marquee. Defaults to the built-in demo set. */
  testimonials?: Testimonial[];
  /** Marquee speed in pixels per second. Default 55. */
  speed?: number;
  /** Pause the marquee while hovered. Default true. */
  pauseOnHover?: boolean;
  /** Hide the video pillars and show only the message strip. */
  showVideos?: boolean;
  /** Background color of the section (used by the marquee edge fades too). */
  background?: string;
  /** Copy for a video slot that has no `src` yet. Defaults to English. */
  placeholder?: PlaceholderCopy;
  className?: string;
}

/* ------------------------------- helpers -------------------------------- */

const AVATAR_PALETTE = [
  "#0a8a72", "#c25d2b", "#7b4fc4", "#b83f63",
  "#2b6fd4", "#3a8f3a", "#a8842b", "#4f6b8c",
  "#9c4bb0", "#2f8f86", "#8a5a2b", "#5a4fb0",
];

const DEFAULT_VIDEOS: VideoTestimonial[] = [
  { name: "Marcus Tran",  role: "Head of Ops, Northbeam",   duration: "0:48", quote: "We replaced three tools with this one." },
  { name: "Priya Raman",  role: "Founder, Cadence Studio",  duration: "1:12", quote: "Paid for itself in the first month." },
  { name: "David Ahmadi", role: "CTO, Lumen Labs",          duration: "0:35", quote: "The fastest rollout we have ever run." },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { name: "Sarah K.",  text: "This is exactly what we needed 🙌", time: "09:14" },
  { name: "Marcus T.", text: "Honestly the best decision we made all year. Onboarding took ten minutes flat.", time: "11:02" },
  { name: "Priya R.",  text: "Game changer.", time: "08:47" },
  { name: "James O.",  text: "Our whole team's productivity went up almost overnight. And support replied in 3 minutes 😮", time: "14:23" },
  { name: "Lena M.",   text: "Worth every penny 💸", time: "16:30" },
  { name: "David A.",  text: "I was skeptical at first but wow — we've cut our reporting time in half and the team actually enjoys using it now.", time: "10:09" },
  { name: "Aisha N.",  text: "10/10 would recommend", time: "12:55" },
  { name: "Tom B.",    text: "Setup was painless. Integrated with our whole stack in an afternoon.", time: "13:18" },
  { name: "Carla V.",  text: "You guys are lifesavers ❤️", time: "15:41" },
  { name: "Nina S.",   text: "Switched from a competitor last month and never looked back. The difference is night and day.", time: "09:58" },
  { name: "Omar H.",   text: "Clean, fast, just works.", time: "17:22" },
  { name: "Ruben P.",  text: "My whole team is obsessed 🔥", time: "18:05" },
];

/** Bubble max-width by message length, so each sticker fits its message. */
function maxWidthFor(text: string | undefined): number {
  const n = (text ?? "").length;
  if (n < 22) return 240;
  if (n < 75) return 340;
  return 440;
}

function initialsFor(name: string | undefined, fallback: string): string {
  if (!name) return fallback;
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* ---------------------------- video pillar ------------------------------ */

function VideoPillar({
  v,
  index,
  isPlaying,
  placeholder,
  onPlay,
  onEnded,
}: {
  v: VideoTestimonial;
  index: number;
  isPlaying: boolean;
  placeholder: PlaceholderCopy;
  onPlay: (el: HTMLVideoElement | null) => void;
  onEnded: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const avatarColor = v.color ?? AVATAR_PALETTE[index % AVATAR_PALETTE.length];

  const handleClick = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      onPlay(el);
      void el.play();
    } else {
      el.pause();
      onEnded();
    }
  };

  return (
    <div className="flex flex-col rounded-[22px] bg-white p-[7px] shadow-[0_12px_32px_rgba(11,20,26,0.13),0_2px_5px_rgba(11,20,26,0.08)]">
      <button
        type="button"
        onClick={handleClick}
        aria-label={isPlaying ? `Pause video from ${v.name ?? "customer"}` : `Play video from ${v.name ?? "customer"}`}
        className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#2a3942] to-[#111b21] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a8f74] focus-visible:ring-offset-2"
      >
        {v.src ? (
          <video
            ref={videoRef}
            src={v.src}
            poster={v.poster}
            playsInline
            preload="metadata"
            onEnded={onEnded}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center text-[12.5px] leading-relaxed text-white/50">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M8 4v16M16 4v16M3 12h18" />
            </svg>
            {placeholder.title}
            <br />
            {placeholder.subtitle.replace("{n}", String(index + 1))}
          </div>
        )}

        {/* Name / role bar */}
        <div
          className={
            "absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-gradient-to-t from-[#111b21]/90 to-transparent p-4 transition-opacity duration-300 " +
            (isPlaying ? "opacity-0" : "opacity-100")
          }
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: avatarColor }}
          >
            {v.initials ?? initialsFor(v.name, String(index + 1))}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[14.5px] font-semibold text-white">{v.name}</span>
            <span className="truncate text-[12.5px] text-white/70">{v.role}</span>
          </div>
        </div>

        {/* Duration chip */}
        {v.duration && (
          <span
            className={
              "absolute right-3.5 top-3.5 rounded-full bg-[#111b21]/60 px-2 py-1 text-[11.5px] font-semibold text-white transition-opacity duration-300 " +
              (isPlaying ? "opacity-0" : "opacity-100")
            }
          >
            {v.duration}
          </span>
        )}

        {/* Play button — only when there is something to play. */}
        <span
          className={
            "pointer-events-none absolute left-1/2 top-1/2 flex h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_6px_20px_rgba(11,20,26,0.35)] transition duration-300 group-hover:scale-105 " +
            (!v.src || isPlaying ? "scale-90 opacity-0" : "opacity-100")
          }
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#111b21" className="ml-[3px]">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>

      {v.quote && (
        <p className="px-2.5 pb-2 pt-3.5 text-[15px] font-medium leading-snug text-[#111b21]">“{v.quote}”</p>
      )}
    </div>
  );
}

/* ------------------------------- sticker -------------------------------- */

function Sticker({ t, index }: { t: Testimonial; index: number }) {
  return (
    <div className="mr-6 flex shrink-0 flex-col rounded-[20px] bg-white p-[7px] shadow-[0_12px_32px_rgba(11,20,26,0.13),0_2px_5px_rgba(11,20,26,0.08)]">
      {t.image ? (
        <img
          src={t.image}
          alt={t.imageAlt ?? t.name ?? "Customer testimonial"}
          className="block h-52 w-auto rounded-[14px] object-cover"
          draggable={false}
        />
      ) : (
        <div className="flex flex-col gap-2.5 rounded-[14px] bg-[#efeae2] p-3.5">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full text-[15px] font-semibold text-white"
              style={{ backgroundColor: t.color ?? AVATAR_PALETTE[index % AVATAR_PALETTE.length] }}
            >
              {t.initials ?? initialsFor(t.name, String(index + 1))}
            </div>
            <div className="whitespace-nowrap text-base font-semibold text-[#111b21]">{t.name}</div>
          </div>
          <div className="flex justify-end">
            <div
              className="rounded-[10px] rounded-tr-[3px] bg-[#d9fdd3] px-[11px] pb-1.5 pt-2"
              style={{ maxWidth: maxWidthFor(t.text) }}
            >
              <div className="text-[16.5px] leading-normal text-[#111b21]">{t.text}</div>
              <div className="mt-1 flex items-center justify-end gap-1">
                {t.time && <span className="text-[12.5px] text-[#667781]">{t.time}</span>}
                <span className="text-[13.5px] font-bold tracking-[-3px] text-[#53bdeb]">✓✓</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------- section -------------------------------- */

export default function SocialProofSection({
  eyebrow = "In their own words",
  heading = "Hear it from three of them",
  videos = DEFAULT_VIDEOS,
  testimonials = DEFAULT_TESTIMONIALS,
  speed = 55,
  pauseOnHover = true,
  showVideos = true,
  background = "#ffffff",
  placeholder = DEFAULT_PLACEHOLDER,
  className = "",
}: SocialProofSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const playingRef = useRef<HTMLVideoElement | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const build = () => {
      tweenRef.current?.kill();
      gsap.set(track, { x: 0 });
      // The track holds two identical copies, so half its width is one full set.
      const half = track.scrollWidth / 2;
      if (!half) return;
      tweenRef.current = gsap.to(track, {
        x: -half,
        duration: half / speed,
        ease: "none",
        repeat: -1,
      });
    };

    build();

    const ro = new ResizeObserver(() => build());
    ro.observe(track);

    return () => {
      ro.disconnect();
      tweenRef.current?.kill();
    };
  }, [speed, testimonials]);

  const setTimeScale = (value: number) => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: value, duration: 0.4 });
  };

  /** Only one video plays at a time. */
  const handlePlay = (index: number) => (el: HTMLVideoElement | null) => {
    if (playingRef.current && playingRef.current !== el) playingRef.current.pause();
    playingRef.current = el;
    setPlayingIndex(index);
  };

  const loop = [...testimonials, ...testimonials];

  return (
    <section className={"w-full py-16 " + className} style={{ backgroundColor: background }}>
      {showVideos && (
        <div className="mx-auto max-w-[1120px] px-8">
          <div className="flex flex-col items-center gap-2.5 text-center">
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3a8f74]">{eyebrow}</span>
            )}
            {heading && (
              <h2 className="text-[clamp(28px,3.6vw,40px)] font-bold leading-tight tracking-tight text-[#111b21]">
                {heading}
              </h2>
            )}
          </div>

          <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {videos.slice(0, 3).map((v, i) => (
              <VideoPillar
                key={i}
                v={v}
                index={i}
                isPlaying={playingIndex === i}
                placeholder={placeholder}
                onPlay={handlePlay(i)}
                onEnded={() => setPlayingIndex(null)}
              />
            ))}
          </div>
        </div>
      )}

      <div
        className="relative mt-13 w-full overflow-hidden py-8"
        style={{
          marginTop: showVideos ? 52 : 0,
          maskImage:
            "linear-gradient(to right, transparent, #000 140px, #000 calc(100% - 140px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 140px, #000 calc(100% - 140px), transparent)",
        }}
        onMouseEnter={() => pauseOnHover && setTimeScale(0)}
        onMouseLeave={() => pauseOnHover && setTimeScale(1)}
      >
        <div ref={trackRef} className="flex w-max">
          {loop.map((t, i) => (
            <Sticker key={i} t={t} index={i % testimonials.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
