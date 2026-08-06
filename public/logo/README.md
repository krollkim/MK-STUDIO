# MK Studio — logo 4a "Waveform"

The monogram is drawn as one silver armature with a black line; a real signal trace runs
through it in amber. The trace is a drawn shape, not a fixed-width line, so it tapers to a
point where it starts and closes. Where it passes the letters it is cut away, so the gap is
genuinely transparent — the mark works on white, on wood, on a photograph.

## Files

| File | Use it for |
| --- | --- |
| `mk-studio-mark.svg` | The mark. Default for light backgrounds. |
| `mk-studio-mark-reversed.svg` | Dark backgrounds — brighter silver, lighter amber, no black line (an outline in black disappears on black). |
| `mk-studio-mark-black.svg` | One colour, black. Stamps, engraving, embroidery, single-ink print. Wider cut around the letters so the trace still separates without colour to help it. |
| `mk-studio-mark-white.svg` | One colour, white. Same, reversed. |
| `mk-studio-lockup.svg` | Mark + "M.K STUDIO". Needs the Figtree webfont on the page; if you can't load it, use the HTML snippet below. |
| `mk-studio-favicon.svg` | Square crop, and a **simplified trace** — fewer, heavier peaks, same envelope. Use this anywhere the mark is under 40px. |
| `mk-studio-favicon-white.svg` | The same small-size cut in white, for dark avatars. |
| `favicon-512/180/32/16.png` | Raster favicons and the Apple touch icon. |
| `mk-studio-mark-1200.png`, `-600.png` | Raster mark where SVG isn't accepted. |

## On the website

```html
<link rel="icon" href="/mk-studio-favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/favicon-180.png">
```

Header lockup in HTML, so the type stays real text:

```html
<a class="mk-lockup" href="/">
  <img src="/mk-studio-mark.svg" alt="MK Studio">
  <span><b>M.K</b><i>STUDIO</i></span>
</a>
```

```css
.mk-lockup { display: flex; align-items: center; gap: 22px; text-decoration: none; }
.mk-lockup img { height: 48px; width: auto; }
.mk-lockup span { display: flex; flex-direction: column; gap: 4px;
  border-left: 1px solid #dcd3c4; padding-left: 22px; }
.mk-lockup b { font: 800 24px/1 Figtree, sans-serif; letter-spacing: .12em; color: #201e1d; }
.mk-lockup i { font: 500 10px/1 Figtree, sans-serif; letter-spacing: .44em; color: #82796a;
  font-style: normal; }
```

## Rules

- **Under 40px, switch to `mk-studio-favicon.svg`.** Below that the full trace smears; the
  favicon file is the small-size cut and stays legible down to 16px.
- **Minimum size** — 24px tall on screen, 8mm in print, using the small-size cut.
- **Clear space** — a margin equal to the width of the M's stem on all four sides. Nothing
  crosses the trace.
- **Don't** flatten the silver to one grey, add a shadow, put the mark in a circle, stretch
  it, redraw the trace, or set it in any colour but the amber below.

## Colours

| Role | Hex |
| --- | --- |
| Silver, highlight | `#ffffff` |
| Silver, mid | `#a5abb4` |
| Silver, shade | `#8f959e` |
| Line | `#201e1d` |
| Amber, light | `#e8834a` |
| Amber | `#b5541f` | (matches the site CTA)
| Amber, deep | `#7d3812` |
| Walnut | `#5a2f10` |
| Page cream | `#f5ead8` |
