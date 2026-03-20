# design.md

Design reference for the RAMSOC Sumobots website. Use this when building or modifying pages (especially the 2026 page) to maintain visual consistency.

## Color Palette

| Role | Value | Usage |
|------|-------|-------|
| Background | `bg-black` | Page background |
| Primary text | `text-white` / `var(--color-primary)` | Headings, bold text, emphasis |
| Secondary text | `#b3b3b3` / `text-gray-300` | Body text, paragraph copy |
| Muted text | `text-gray-400`, `text-gray-500` | Subtitles, less important details |
| Accent (primary) | `rose-600` / `rose-500` | Buttons, highlights, stat titles, active tabs, time indicators |
| Accent (link) | `text-blue-400` hover `text-blue-300` | Hyperlinks (`.text-link` class) |
| Warning/notice | `border-amber-500/50`, `bg-amber-900/30`, `text-amber-200` | Alert banners, notices |
| Surface | `bg-gray-800/50`, `bg-zinc-900/70`, `bg-gray-700/60` | Cards, containers, panels |
| Surface border | `border-white/10`, `border-gray-500`, `border-gray-700` | Card borders, table borders, dividers |

## Typography

Two Google Fonts imported globally:

| Utility class | Font | Weight | Used for |
|---------------|------|--------|----------|
| `font-display` | **Audiowide** | 700 (bold) | Headings (h1-h3), table headers, display text. Auto-sets `color: primary`. |
| `font-main` | **Anta** | normal | Body text (p, li, td, legend). Auto-sets `color: secondary`. |

### Heading sizes (base layer defaults)

- `h1` — `text-5xl font-display`
- `h2` — `text-4xl font-display mb-5`
- `h3` — `text-xl font-display`
- Section headings use the pattern: `"About SUMOBOTS."`, `"FAQ."`, `"Further Support."` — short title with trailing period

### Responsive text

Body text scales with breakpoints: `text-sm` base, `lg:text-base`. Banner text uses custom sizes: `text-[0.8rem] md:text-[1rem] xl:text-[1.5rem]`.

## Layout

### Sections

- Sections use the `.container` class: `mt-20 w-full scroll-mt-24 gap-x-8 px-4`
- `section + section` automatically inherits the same spacing
- Max-width containers use `max-w-7xl mx-auto` (footer) or `max-w-4xl mx-auto` (schedule card)
- Content cards use `rounded-lg border border-white/10 bg-zinc-900/70 p-4 shadow-md`

### Responsive grid patterns

- **Stats**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- **Sponsors**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Support cards**: `grid-cols-1 md:grid-cols-2`
- **Footer**: `grid-cols-1 sm:grid-cols-3 lg:grid-cols-4`
- **FAQ**: side-by-side `lg:flex-row` with sidebar at `lg:w-[25%]`

### Navbar

- Fixed top, `h-20`, `z-50`
- Transparent over the banner, transitions to `bg-black/50` when banner scrolls out of view
- Hides (slides up `y: -100`) when footer is in view

## Components & Patterns

### Buttons

Two button classes defined globally:

```
.button       → bg-rose-600, white text, hover:font-bold, responsive padding
.button-white → bg-white, black text, hover:font-bold, responsive padding
```

Both use `flex w-fit items-center gap-2` and `duration-200` transition.

### Tab navigation

Used in Stream Section and Event Schedule:
- Active tab: `bg-rose-600 text-white shadow-xl` (schedule) or `bg-gray-900 text-white shadow-lg` with rose-500 bottom indicator (streams)
- Inactive tab: `text-gray-400 hover:bg-rose-600/30 hover:text-white`
- Content swaps use `AnimatePresence mode="wait"` with fade + slide transitions

### Cards / Surfaces

- **Dark card**: `rounded-md bg-gray-700/60 px-8 py-4` (support boxes)
- **Glass card**: `rounded-lg border border-white/10 bg-zinc-900/70 p-4 shadow-md` (schedule, stream section)
- **Info box**: `border border-gray-500 bg-gray-950 p-4 rounded-md` (rulebook)
- **Notice banner**: `rounded-md border border-amber-500/50 bg-amber-900/30 p-3 text-amber-200`
- **Sponsor card**: `h-40 w-48 sm:h-52 sm:w-64 rounded-sm border border-gray-700` with `hover:scale-105`

### Stats counters

- White circle icon container: `h-16 w-16 rounded-full bg-white` with black icon inside
- Animated number counter below
- Rose-colored stat title: `text-rose-600`
- `hover:scale-105` on the whole stat card

### FAQ accordion

- Border-bottom separated rows: `border-b border-gray-300`
- Chevron rotates 180deg on open
- Content animates `height: 0 → auto` and `opacity: 0 → 1`

### Social links

Two variants:
- **Default**: icon only, `hover:text-gray-400`
- **Pill**: `rounded-full bg-white px-4 py-2 text-gray-950` with icon + label

### Tables

- `border-collapse border border-gray-500`
- Header row: `bg-gray-800/50 text-white`
- Cells: `border border-gray-500 px-4 py-2`
- Icons hidden on mobile: `hidden md:block`

## Animation Conventions

All animations use **Framer Motion** (`motion/react` or `framer-motion`):

| Pattern | Values | Duration |
|---------|--------|----------|
| Fade + slide in | `opacity: 0→1, y: 10→0` | 0.3–0.4s |
| Stagger children | `staggerChildren: 0.1` | within container |
| Tab content swap | `AnimatePresence mode="wait"` with y slide | 0.3s |
| Navbar show/hide | `y: 0 ↔ -100` | 0.3s easeOut |
| FAQ expand | `height: 0→auto, opacity: 0→1` | 0.3s easeInOut |
| Hover scale | `hover:scale-105` (CSS, not Framer) | `duration-200` or `duration-300` |
| Typewriter | Type at 150ms, delete at 50ms, pause 1s | cursor blinks at 1s loop |

## Background

- Body has a repeating SVG gear pattern: `background-image: url("/2025/background_gears.svg")`
- Banner is full viewport height: `h-[100vh] min-h-[50rem]`

## Images

- All `<img>` tags default to `h-full w-full object-cover` (base layer)
- Use Next.js `<Image>` component with `width`/`height` and `sizes` for responsive loading
- Remote images from Contentful: `images.ctfassets.net`
