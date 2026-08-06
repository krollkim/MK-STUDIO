"use client";

/**
 * AccessibilityWidget — drop-in accessibility panel (Hebrew / RTL, IS 5568 oriented)
 *
 * Usage (app router):
 *   // app/layout.tsx
 *   import AccessibilityWidget from "@/components/AccessibilityWidget";
 *   ...
 *   <body>
 *     {children}
 *     <AccessibilityWidget statementUrl="/accessibility" coordinatorName="רכזת נגישות: נועה ברק" coordinatorPhone="04-6543210" />
 *   </body>
 *
 * Notes
 * - Preferences are written as data-attributes + CSS vars on <html> and persisted in localStorage,
 *   so they survive navigation and reloads.
 * - Text scaling works out of the box for any text sized in rem/em. For px-sized text, either
 *   switch to rem or write sizes as: font-size: calc(18px * var(--a11y-scale, 1)).
 * - Keyboard: Alt+A opens/closes, Esc closes, Tab cycles the controls (focus is trapped while open).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePastHero } from "@/lib/usePastHero";

const SCALE_STEPS = [1, 1.15, 1.3, 1.5, 1.75, 2] as const;
const STORAGE_KEY = "a11y:prefs:v1";

type Contrast = "none" | "dark" | "light" | "mono";

type Prefs = {
  step: number;
  contrast: Contrast;
  font: boolean;
  spacing: boolean;
  links: boolean;
  stopMotion: boolean;
  bigCursor: boolean;
  guide: boolean;
  hideImages: boolean;
};

const DEFAULTS: Prefs = {
  step: 0,
  contrast: "none",
  font: false,
  spacing: false,
  links: false,
  stopMotion: false,
  bigCursor: false,
  guide: false,
  hideImages: false,
};

export type AccessibilityWidgetProps = {
  /** Which corner the launcher sits in. Default "left". */
  side?: "left" | "right";
  /** Link to the full accessibility statement (legally required in Israel). */
  statementUrl?: string;
  /** Accessibility coordinator, shown in the panel footer. */
  coordinatorName?: string;
  coordinatorPhone?: string;
  /** Feature switches. */
  showReadingGuide?: boolean;
  showHideImages?: boolean;
  rememberPrefs?: boolean;
  /** Palette overrides. Defaults to the warm studio palette. */
  theme?: Partial<{
    accent: string;
    accentHover: string;
    accentSoft: string;
    accentLit: string;
    surface: string;
    surface2: string;
    bg: string;
    ink: string;
    night: string;
    muted: string;
    line: string;
    wood: string;
    woodSoft: string;
  }>;
};

const BASE_THEME = {
  bg: "#f4f1eb",
  surface: "#fbf9f5",
  surface2: "#e9e2d6",
  night: "#1b1815",
  ink: "#1a1917",
  muted: "#6e6960",
  line: "#ddd5c7",
  wood: "#7a5433",
  woodSoft: "#d8c3a6",
  accent: "#b34e24",
  accentHover: "#9c421c",
  accentSoft: "#f0e2d5",
  accentLit: "#e39264",
};

const BIG_CURSOR =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M8 4 L8 38 L17 29 L23 43 L30 40 L24 26 L36 26 Z' fill='%231b1815' stroke='%23ffffff' stroke-width='2.5'/%3E%3C/svg%3E\") 6 3, auto";

/** Global rules the widget needs. Scoped to <html> data-attributes; the widget UI itself is excluded. */
const GLOBAL_CSS = `
:root { --a11y-scale: 1; --a11y-lh: normal; --a11y-ls: normal; }
html[data-a11y-scaled="true"] { font-size: calc(100% * var(--a11y-scale)); }
html[data-a11y-spacing="on"] body *:not([data-a11y-ui]):not([data-a11y-ui] *) {
  line-height: var(--a11y-lh) !important; letter-spacing: var(--a11y-ls) !important;
}
html[data-a11y-font="on"] body *:not([data-a11y-ui]):not([data-a11y-ui] *) {
  font-family: Assistant, Arial, Helvetica, sans-serif !important; font-weight: 600 !important;
}
html[data-a11y-links="on"] body a:not([data-a11y-ui] a) {
  text-decoration: underline !important; text-decoration-thickness: 2px !important;
  text-underline-offset: 3px !important; background: var(--a11y-link-bg) !important;
  padding: 0 3px; border-radius: 3px;
}
html[data-a11y-motion="off"] *, html[data-a11y-motion="off"] *::before, html[data-a11y-motion="off"] *::after {
  animation: none !important; transition: none !important; scroll-behavior: auto !important;
}
html[data-a11y-cursor="big"], html[data-a11y-cursor="big"] * { cursor: ${BIG_CURSOR} !important; }
html[data-a11y-images="off"] body :is(img, picture, video, svg):not([data-a11y-ui] *):not([data-a11y-keep]) {
  visibility: hidden !important;
}
html[data-a11y-images="off"] body img:not([data-a11y-ui] *):not([data-a11y-keep]) {
  position: relative; visibility: visible !important; opacity: 0;
}
html[data-a11y-contrast="dark"] body *:not([data-a11y-ui]):not([data-a11y-ui] *) {
  background-color: #000 !important; background-image: none !important; color: #ffe14d !important;
  border-color: #ffe14d !important; box-shadow: none !important; text-shadow: none !important;
}
html[data-a11y-contrast="dark"] body { background: #000 !important; }
html[data-a11y-contrast="dark"] body a:not([data-a11y-ui] a) { color: #7fdcff !important; }
html[data-a11y-contrast="light"] body *:not([data-a11y-ui]):not([data-a11y-ui] *) {
  background-color: #fff !important; background-image: none !important; color: #000 !important;
  border-color: #000 !important; box-shadow: none !important;
}
html[data-a11y-contrast="light"] body { background: #fff !important; }
html[data-a11y-contrast="light"] body a:not([data-a11y-ui] a) { color: #0043a8 !important; }
/* Grayscale goes on <html>, NOT on body.
   A filter makes the element a containing block for fixed-position
   descendants — so with the filter on body, every position:fixed thing
   (the WhatsApp float, this widget's own launcher, the reading guide)
   stopped measuring from the viewport and started measuring from the body
   box instead. On a 13,000px-tall page that parks them far below the fold
   and they look deleted. The Filter Effects spec exempts the document root
   from creating that containing block, so moving it up one level keeps the
   exact same visual result with none of the layout damage. */
html[data-a11y-contrast="mono"] { filter: grayscale(1) contrast(1.08) !important; }
[data-a11y-ui] :focus-visible { outline: 3px solid var(--a11y-focus) !important; outline-offset: 2px; border-radius: 6px; }
`;

export default function AccessibilityWidget({
  side = "left",
  statementUrl = "/accessibility",
  coordinatorName = "רכז/ת נגישות",
  coordinatorPhone = "",
  showReadingGuide = true,
  showHideImages = true,
  rememberPrefs = true,
  theme,
}: AccessibilityWidgetProps) {
  const t = { ...BASE_THEME, ...theme };
  const [open, setOpen] = useState(false);
  const pastHero = usePastHero();

  /**
   * Docked out of the way while the hero is on screen, so the launcher does not
   * sit on top of the hero's own CTA on a phone.
   *
   * `|| open` is the important half. Without it, Alt+A over the hero would
   * toggle a panel nobody can see, which would make the accessibility controls
   * genuinely unreachable in the first viewport rather than merely tucked away.
   * With it, the keyboard path always works and using it brings the whole
   * widget back into view.
   */
  const docked = !pastHero && !open;
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const guideRef = useRef<HTMLDivElement | null>(null);

  const set = useCallback(<K extends keyof Prefs>(key: K, value: Prefs[K]) => {
    setPrefs((p) => ({ ...p, [key]: value }));
  }, []);
  const flip = useCallback((key: keyof Prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }, []);

  /* hydrate */
  useEffect(() => {
    let next: Prefs = { ...DEFAULTS };
    if (rememberPrefs) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) next = { ...next, ...(JSON.parse(raw) as Partial<Prefs>) };
      } catch {}
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) next.stopMotion = true;
    setPrefs(next);
  }, [rememberPrefs]);

  /* apply to <html> + persist */
  useEffect(() => {
    const el = document.documentElement;
    const scale = SCALE_STEPS[prefs.step] ?? 1;
    el.style.setProperty("--a11y-scale", String(scale));
    el.style.setProperty("--a11y-lh", prefs.spacing ? "2.05" : "normal");
    el.style.setProperty("--a11y-ls", prefs.spacing ? "0.045em" : "normal");
    el.style.setProperty("--a11y-link-bg", t.accentSoft);
    el.style.setProperty("--a11y-focus", t.accent);
    el.dataset.a11yScaled = scale !== 1 ? "true" : "false";
    el.dataset.a11yContrast = prefs.contrast;
    el.dataset.a11ySpacing = prefs.spacing ? "on" : "off";
    el.dataset.a11yFont = prefs.font ? "on" : "off";
    el.dataset.a11yLinks = prefs.links ? "on" : "off";
    el.dataset.a11yMotion = prefs.stopMotion ? "off" : "on";
    el.dataset.a11yCursor = prefs.bigCursor ? "big" : "normal";
    el.dataset.a11yImages = prefs.hideImages ? "off" : "on";
    if (rememberPrefs) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      } catch {}
    }
  }, [prefs, rememberPrefs, t.accent, t.accentSoft]);

  /* keyboard: Alt+A / Esc */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.code === "KeyA" || e.key.toLowerCase() === "a")) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setOpen((o) => {
          if (o) launcherRef.current?.focus();
          return false;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* reading guide follows the pointer */
  useEffect(() => {
    if (!prefs.guide) return;
    const onMove = (e: MouseEvent) => {
      const g = guideRef.current;
      if (g) g.style.top = `${Math.max(0, e.clientY - 29)}px`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefs.guide]);

  /* focus management + focus trap while open */
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("button, a, [tabindex]:not([tabindex='-1'])");
    first?.focus();
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])")
      );
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

  const scalePct = Math.round((SCALE_STEPS[prefs.step] ?? 1) * 100);
  const atMin = prefs.step === 0;
  const atMax = prefs.step === SCALE_STEPS.length - 1;

  const toggles = useMemo(
    () =>
      (
        [
          ["font", "פונט קריא ומודגש", "מחליף לגופן סאנס ברור יותר"],
          ["spacing", "ריווח שורות ואותיות", "מרווח גדול בין שורות ותווים"],
          ["links", "הדגשת קישורים", "קו תחתון ורקע לכל קישור"],
          ["stopMotion", "עצירת אנימציות", "מבטל תנועה, מעברים והבהובים"],
          ["bigCursor", "סמן עכבר גדול", "סמן מוגדל בניגודיות גבוהה"],
          ["guide", "סרגל קריאה", "פס שעוקב אחרי העכבר"],
          ["hideImages", "הסתרת תמונות", "מסתיר מדיה ומשאיר טקסט"],
        ] as [keyof Prefs, string, string][]
      ).filter(
        ([key]) => (key !== "guide" || showReadingGuide) && (key !== "hideImages" || showHideImages)
      ),
    [showReadingGuide, showHideImages]
  );

  const modes: [Contrast, string][] = [
    ["none", "ברירת מחדל"],
    ["dark", "ניגודיות כהה"],
    ["light", "ניגודיות בהירה"],
    ["mono", "גווני אפור"],
  ];

  const isRight = side === "right";
  const label = { fontSize: 12, letterSpacing: ".1em", color: t.wood, marginBottom: 10 } as const;
  const stepBtn: React.CSSProperties = {
    flex: 1,
    padding: "11px 0",
    border: `1px solid ${t.line}`,
    background: t.surface,
    borderRadius: 12,
    fontWeight: 700,
    color: t.night,
    cursor: "pointer",
    fontFamily: "inherit",
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {prefs.guide && (
        <div
          ref={guideRef}
          data-a11y-ui=""
          aria-hidden="true"
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            height: 58,
            zIndex: 2147483000,
            pointerEvents: "none",
            borderTop: `2px solid ${t.accent}`,
            borderBottom: `2px solid ${t.accent}`,
            background: "rgba(179,78,36,.09)",
          }}
        />
      )}

      <div
        data-a11y-ui=""
        dir="rtl"
        style={{
          position: "fixed",
          bottom: 24,
          left: isRight ? "auto" : 24,
          right: isRight ? 24 : "auto",
          zIndex: 2147483001,
          display: "flex",
          flexDirection: "column",
          alignItems: isRight ? "flex-start" : "flex-end",
          gap: 14,
          fontFamily: "Assistant, Arial, sans-serif",
          // The closed panel is `visibility: hidden`, which still OCCUPIES
          // layout — so this container stays 336px wide and most of the
          // viewport tall. At this z-index it would swallow every click in
          // that whole area, including the floating button stacked above the
          // launcher. Clicks pass through the container; the panel and the
          // launcher opt back in individually.
          pointerEvents: "none",
          // Hidden over the hero. `visibility` as well as opacity, because an
          // invisible launcher that is still in the tab order is worse than a
          // visible one in the way — hidden takes it out of tab order and the
          // launcher does not set visibility itself, so it inherits this.
          // Safe on this element: opacity creates a stacking context but this
          // one already has `position: fixed` + a z-index, so nothing changes,
          // and it is not a containing block for fixed DESCENDANTS either —
          // only transform / filter / perspective do that.
          opacity: docked ? 0 : 1,
          visibility: docked ? "hidden" : "visible",
          transition: "opacity .3s ease, visibility .3s ease",
        }}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-label="הגדרות נגישות"
          aria-hidden={!open}
          style={{
            order: 1,
            width: 336,
            maxHeight: "78vh",
            overflowY: "auto",
            background: t.surface,
            border: `1px solid ${t.line}`,
            borderRadius: 20,
            boxShadow: "0 26px 60px -22px rgba(27,24,21,.42), 0 2px 6px rgba(27,24,21,.08)",
            transition: "opacity .22s ease, transform .22s ease, visibility .22s",
            transformOrigin: isRight ? "bottom right" : "bottom left",
            opacity: open ? 1 : 0,
            visibility: open ? "visible" : "hidden",
            transform: open ? "none" : "translateY(10px) scale(.97)",
            pointerEvents: open ? "auto" : "none",
            color: t.ink,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              padding: "16px 18px",
              borderBottom: `1px solid ${t.line}`,
              background: t.bg,
              borderRadius: "20px 20px 0 0",
              position: "sticky",
              top: 0,
              zIndex: 2,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: t.night }}>התאמות נגישות</div>
              <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>ההעדפות נשמרות בדפדפן שלך</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
              aria-label="סגירת תפריט הנגישות"
              style={{
                width: 32,
                height: 32,
                flex: "none",
                border: `1px solid ${t.line}`,
                background: t.surface,
                color: t.muted,
                borderRadius: "50%",
                fontSize: 17,
                lineHeight: 1,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ padding: "16px 18px 6px" }}>
            <div style={label}>גודל טקסט</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                onClick={() => set("step", Math.max(0, prefs.step - 1))}
                disabled={atMin}
                aria-label="הקטנת טקסט"
                style={{ ...stepBtn, fontSize: 17, opacity: atMin ? 0.45 : 1 }}
              >
                A−
              </button>
              <div
                aria-live="polite"
                style={{
                  minWidth: 74,
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 700,
                  background: t.surface2,
                  borderRadius: 12,
                  padding: "11px 0",
                }}
              >
                {scalePct}%
              </div>
              <button
                type="button"
                onClick={() => set("step", Math.min(SCALE_STEPS.length - 1, prefs.step + 1))}
                disabled={atMax}
                aria-label="הגדלת טקסט"
                style={{ ...stepBtn, fontSize: 21, opacity: atMax ? 0.45 : 1 }}
              >
                A+
              </button>
            </div>
          </div>

          <div style={{ padding: "16px 18px 6px" }}>
            <div style={label}>ניגודיות וצבע</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {modes.map(([id, text]) => {
                const sel = prefs.contrast === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={sel}
                    onClick={() => set("contrast", sel ? "none" : id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 12px",
                      border: `1px solid ${sel ? t.night : t.line}`,
                      background: sel ? t.night : t.surface,
                      color: sel ? t.surface : t.ink,
                      borderRadius: 12,
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "start",
                      fontFamily: "inherit",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 14,
                        height: 14,
                        flex: "none",
                        borderRadius: "50%",
                        border: `1px solid ${sel ? t.surface : t.muted}`,
                        background: `linear-gradient(90deg, ${t.night} 50%, ${t.surface} 50%)`,
                      }}
                    />
                    {text}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ padding: "16px 18px 6px" }}>
            <div style={label}>קריאות וניווט</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {toggles.map(([key, text, hint]) => {
                const on = !!prefs[key];
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => flip(key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      width: "100%",
                      padding: "11px 12px",
                      border: `1px solid ${on ? t.accentLit : t.line}`,
                      background: on ? t.accentSoft : t.surface,
                      borderRadius: 12,
                      cursor: "pointer",
                      textAlign: "start",
                      fontFamily: "inherit",
                    }}
                  >
                    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: t.ink }}>{text}</span>
                      <span style={{ fontSize: 12, color: t.muted }}>{hint}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        position: "relative",
                        flex: "none",
                        width: 44,
                        height: 24,
                        borderRadius: 999,
                        background: on ? t.accent : t.line,
                        border: `1px solid ${on ? t.accent : t.woodSoft}`,
                        transition: "background .18s",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: 2,
                          insetInlineStart: on ? 22 : 2,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: t.surface,
                          boxShadow: "0 1px 3px rgba(27,24,21,.3)",
                          transition: "inset-inline-start .18s",
                        }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{
              padding: "14px 18px 18px",
              marginTop: 8,
              borderTop: `1px solid ${t.line}`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <button
              type="button"
              onClick={() => setPrefs(DEFAULTS)}
              style={{
                padding: 11,
                border: `1px solid ${t.accent}`,
                background: "transparent",
                color: t.accent,
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              איפוס כל ההתאמות
            </button>
            <a
              href={statementUrl}
              style={{ fontSize: 14, color: t.wood, textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              הצהרת הנגישות המלאה
            </a>
            <div style={{ fontSize: 12, color: t.muted, lineHeight: 1.6 }}>
              נתקלת בבעיית נגישות? {coordinatorName}
              {coordinatorPhone ? ` · ${coordinatorPhone}` : ""}
              <br />
              קיצור מקלדת: Alt + A
            </div>
          </div>
        </div>

        {/*
          The launcher deliberately borrows `.btn-amber` from globals.css and
          sets NO colour of its own, so it is the same object as the WhatsApp
          float sitting directly above it — same 56px circle, same amber
          gradient, same halo, same hover cross-fade. Any future change to the
          CTA colour reaches this button automatically.
        */}
        <button
          ref={launcherRef}
          type="button"
          className="btn-amber"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="פתיחת תפריט התאמות נגישות"
          title="התאמות נגישות (Alt+A)"
          style={{
            order: 2,
            width: 56,
            height: 56,
            borderRadius: "50%",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            // The container is pointer-events:none; opt back in here.
            pointerEvents: "auto",
          }}
        >
          <span style={{ display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 48 48" width={30} height={30} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round">
              <circle cx="24" cy="9" r="4.5" fill="currentColor" stroke="none" />
              <path d="M8 18 H40" />
              <path d="M24 18 V30" />
              <path d="M24 30 L16 43" />
              <path d="M24 30 L32 43" />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
}
