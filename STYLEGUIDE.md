### Bushido.digital — Site & UI Styleguide (v1.0)

This guide defines the visual language, interaction patterns, and coding conventions for Bushido.digital. It is intended for both human collaborators and automated agents making changes to this repository.

Last updated: 2025-11-21 13:51

#### Audience
- Design/Brand agents: color usage, typography, motion, accessibility, voice & tone.
- Engineering agents: Nuxt/Vue code patterns, page theming, transitions, utilities.

---

### 1) Brand Tokens (Colors)

CSS variable tokens are declared in `app/assets/css/main.css` under `:root` and mirrored as utility classes. Use these names consistently.

- neo-cyan — `--neo-cyan: #10c8ff`
  - Role: Global site background and default theme color (non-portfolio routes)
  - Utility: `.bg-neo-cyan`
- neo-lime — `--neo-lime: #c7ff2e`
  - Role: Pop card backgrounds, accents
  - Utility: `.bg-neo-lime`
- neo-magenta — `--neo-magenta: #ff0bd2`
  - Role: Primary CTA button default, decorative blobs, portfolio page background (current)
  - Utility: `.bg-neo-magenta`
- neo-orange — `--neo-orange: #ff8e00`
  - Role: Secondary CTA variant, accent
  - Utility: `.bg-neo-orange`
- neo-purple — `--neo-purple: #8b5cf6`
  - Role: Alternate accent (not the default on portfolio at the moment)
  - Utility: `.bg-neo-purple`
- neo-ink — `--neo-ink: #05060b`
  - Role: Deep blackish ink for text, borders, shadows (we often directly use `#000` in shadows/borders per current design)

Notes
- Body text defaults to black (`#000`).
- Borders and shadows on “pop” elements intentionally use strong black to preserve the pop-art look.

---

### 2) Typography

- Headings (display): `Bangers`
  - Utility class: `comic` (applies the Bangers family and custom letter spacing)
- Body: `Noto Sans JP`, system fallbacks
  - Applied globally to `<body>` in `main.css`

Implementation
- Fonts are loaded in `nuxt.config.ts` via Google Fonts `<link>` tags.
- Keep headlines short, punchy, and high-contrast. Use `comic` class for brand headlines.

---

### 3) Layout & Spacing

- Container: `.container` provides max-width 1120px with horizontal padding. Use it for main sections.
- Spacing: Prefer Tailwind utilities for margins/padding (e.g., `py-12`, `mb-8`).
- Avoid horizontal overflow: the app uses `.no-hscroll` when needed to clip decorative overflow.

---

### 4) Core UI Primitives & Utilities

- Pop Card: `.pop-card`
  - Background: lime; thick black border; shadow blocky; used for cards and image frames.
- Pop Button: `.pop-btn`
  - Default background magenta; thick border; snappy hover/active transforms. Can combine with accent classes (e.g., `bg-neo-orange`).
- Speech Bubble: `.speech` + tail via `:before/:after`
  - Use sparingly for hero/big statements. For animated hero speech, also use `.hero-bubble`.
- Halftone Background: `.halftone`
  - Dotted background effect used behind imagery.
- Color Utilities: `.bg-neo-*` for each token; `.ink` for black text.

Examples
```vue
<button class="pop-btn rounded-xl px-6 py-3">Click me</button>

<div class="pop-card rounded-2xl overflow-hidden">
  <div class="aspect-[4/3] bg-white">
    <!-- image/content -->
  </div>
  <div class="p-4">Meta</div>
  </div>
```

---

### 5) Motion & Transitions

- Global page transition (Nuxt `app.pageTransition`): name `page`, mode `out-in`.
  - CSS in `main.css` defines a subtle vertical slide-fade.
- Reduced Motion: Respect `prefers-reduced-motion: reduce`; the CSS disables transitions, and JS checks this preference.
- Hero Animations: `Motion One` is used in `app/pages/index.vue` for pop-in, float, and hover wiggle of the `.hero-bubble`.

Guidelines
- Keep transitions short (≈ 200–300ms) and purposeful.
- Do not add large parallax or constant motion that could distract; prefer micro-interactions.

---

### 6) Theming & Routing

- Global background: neo-cyan (#10c8ff) set on `<body>`.
- Portfolio page (`/portfolio`): overrides body background to magenta and sets a matching browser theme color.
  - In `app/pages/portfolio/index.vue`:
    - `useHead({ bodyAttrs: { class: ['bg-neo-magenta'] } })`
    - `useSeoMeta({ themeColor: '#ff0bd2' })`
- If a route needs a unique background/theme, follow the same pattern: set a page-scoped body class and a matching `themeColor`.

Do NOT
- Do not change the global body background for route-scoped accents.
- Do not set conflicting page transitions; reuse `page`.

---

### 7) SEO & Head

- Global defaults in `nuxt.config.ts`:
  - Title: “Bushido.digital — Backend systems & frontend apps”
  - Theme color: `#10c8ff` (matches global cyan)
  - Description: concise service summary
- Per-page overrides:
  - Use `useSeoMeta({ title, description?, themeColor? })`.
  - Keep titles in the form `Page — Bushido.digital`.

---

### 8) Accessibility

- Focus styles: rely on browser default outline with `outline-offset: 3px` (set globally).
- Color contrast: ensure readable contrast on neon backgrounds; most text lives on white or neutral surfaces inside cards.
- Motion: always check `prefers-reduced-motion` before animating significant elements.
- Semantics: prefer proper landmarks (header, main, footer), headings in order, descriptive link text.

---

### 9) Content Voice & Tone

- Voice: confident, concise, friendly; avoid jargon unless necessary.
- Headlines: punchy and short; copy reads like a bold statement.
- Body: clear, benefit-oriented; avoid filler and hedging.
- Internationalization: currently English-centric with occasional Japanese typography support; keep text ASCII-clean unless designed.

Do
- Use active voice; front-load value.
- Keep paragraphs short; use lists where helpful.

Don’t
- Don’t overuse exclamation marks or emoji.
- Don’t invent brand slang.

---

### 10) Components in Use (reference)

- Portfolio Grid: `app/components/PortfolioGrid.vue`
  - Grid of content items; pop card style; optional “NEW” badge for recent items (<60 days).
  - Cover images use a white frame for neutrality and `object-contain` to avoid cropping.
- Default Layout: `app/layouts/default.vue`
  - Provides `Navbar` and `SiteFooter` with `<main><slot/></main>`.

---

### 11) Engineering Conventions

- Framework: Nuxt 3 / Vue 3 with TypeScript in `<script setup lang="ts">`.
- Styling: Tailwind available via `@import "tailwindcss"` plus custom utilities in `main.css`.
- Assets: prefer public URLs for content images; for build-time assets use `useAsset()` with `~`/`@` aliases.
- Auto-imports: Nuxt auto-registers components (e.g., `Navbar`, `SiteFooter`).
- Content: Portfolio items live under `content/portfolio/*.md` (Nuxt Content v2).

Do
- Reuse existing utilities (`pop-card`, `pop-btn`, `.bg-neo-*`, `comic`, `container`).
- Keep card contents inside the card container to avoid overflow clipping issues with shadows.

Don’t
- Don’t introduce new global page transitions or body-level backgrounds outside the approved tokens.

---

### 12) Ready-to-Copy Patterns

Portfolio Page Theming
```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Portfolio — Bushido.digital',
  themeColor: '#ff0bd2', // match the route accent
})

useHead({
  bodyAttrs: { class: ['bg-neo-magenta'] },
})
</script>
```

CTA Buttons
```html
<NuxtLink class="pop-btn px-6 py-3 rounded-xl" to="/portfolio">See our work</NuxtLink>
<NuxtLink class="pop-btn px-6 py-3 rounded-xl bg-neo-orange" to="#contact">Start a project</NuxtLink>
```

Pop Card
```html
<div class="pop-card rounded-2xl overflow-visible">
  <div class="aspect-[4/3] rounded-t-2xl overflow-hidden bg-white">
    <img src="/example.png" alt="Example" class="w-full h-full object-contain p-4">
  </div>
  <div class="px-4 pt-3 pb-4">Meta</div>
</div>
```

---

### 13) Do/Don’t Checklist for Agents

Do
- Do scope background changes to a specific route via `useHead({ bodyAttrs })` and set a matching `themeColor`.
- Do keep animations subtle, fast, and reduced-motion aware.
- Do use existing brand tokens and utilities; propose new tokens via PR if needed.

Don’t
- Don’t change global `body` background unless explicitly requested.
- Don’t introduce conflicting page transitions or heavy motion.
- Don’t bypass Nuxt conventions (e.g., manually importing auto-registered components).

---

### 14) Machine-Readable Appendix

Agents may parse the JSON block below to understand core tokens and route theming. Keep this synchronized with CSS and pages.

```json
{
  "version": "1.0",
  "tokens": {
    "colors": {
      "neo-cyan": "#10c8ff",
      "neo-lime": "#c7ff2e",
      "neo-magenta": "#ff0bd2",
      "neo-orange": "#ff8e00",
      "neo-purple": "#8b5cf6",
      "neo-ink": "#05060b"
    }
  },
  "utilities": {
    "backgrounds": ["bg-neo-cyan", "bg-neo-lime", "bg-neo-magenta", "bg-neo-orange", "bg-neo-purple"],
    "text": ["ink"],
    "components": ["pop-card", "pop-btn", "speech", "halftone", "comic", "container"]
  },
  "routing": {
    "global": { "background": "neo-cyan", "themeColor": "#10c8ff" },
    "routes": {
      "/portfolio": { "backgroundClass": "bg-neo-magenta", "themeColor": "#ff0bd2" }
    }
  },
  "transitions": { "page": { "name": "page", "mode": "out-in" } },
  "a11y": { "reducedMotion": true, "focusOutlineOffset": 3 }
}
```

---

### 15) How to Propose Changes

- For new tokens or significant visual changes, update `app/assets/css/main.css` and this `STYLEGUIDE.md` together.
- For route theming changes, update the specific page file and the JSON in the appendix.
- Keep PRs focused and include before/after screenshots where appropriate.
