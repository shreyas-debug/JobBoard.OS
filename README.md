# JobBoard.OS

A sleek, dark-themed, responsive job board built with Next.js 16, Tailwind CSS v4, and Shadcn/UI. Features real-time filtered search, a sliding job detail drawer, staggered animations, skeleton loaders, and URL-synced filter state.

---

## Design Decisions

### Dark Theme & Glassmorphism

The application enforces a permanent dark theme (`bg-zinc-950`) rather than a toggled preference. Developer tooling and job boards are primarily used in focused, low-distraction environments where dark interfaces reduce eye strain and create a premium, professional feel.

Glassmorphism (`bg-zinc-900/50 backdrop-blur-md`) on job cards creates visual depth without heavyweight drop shadows. The semi-transparent backgrounds allow the subtle spotlight animation in the Hero section to bleed through, giving the UI a cohesive, layered quality. This technique is intentionally restrained — blur is applied only to cards and the sticky filter bar, not globally, to preserve contrast and readability.

### Typography

Geist Sans (400–700) is used throughout. It is a geometric sans-serif designed specifically for code-adjacent interfaces, sharing its DNA with Vercel's design language. Its tabular numerals align salary figures cleanly, and its tight tracking at large sizes makes the Hero headline crisp at all viewport widths.

### Colour Accents

A violet/indigo primary accent (`violet-600`) signals interactivity consistently: the active filter pill, the Apply Now CTA, focus rings, and the job detail sheet's bullet markers all share this colour. Each job attribute (type, department, location) has a distinct hue — violet for Full-time, amber for Contract, emerald for Remote — so users can scan the card grid visually without reading every label.

### Side Drawer vs Modal

The job detail view uses a Shadcn `Sheet` sliding in from the right rather than a full-page modal. This pattern preserves spatial context — the job grid remains visible and partially interactive behind the drawer — which reduces disorientation and makes dismissing the drawer feel natural. The Sheet is Radix-powered and ships with focus trapping and Esc-key dismissal at no extra cost.

---

## Architecture

The project follows **Atomic Design**, organising components by complexity and responsibility.

```
components/
├── atoms/          Smallest, stateless building blocks
│   ├── JobBadge       Colour-coded pill for type / dept / location
│   └── LetterAvatar   Gradient avatar fallback when logo is absent
│
├── molecules/      Compositions of atoms with localised logic
│   ├── JobCard        Glass card — renders logo/avatar, badges, meta
│   ├── JobCardSkeleton  Shadcn Skeleton mirroring the card layout
│   ├── FilterBar      Sticky search + type pills + department Select
│   └── EmptyState     "No roles found" with reset affordance
│
└── organisms/      Page-level sections that own or consume shared state
    ├── Hero           Gradient headline with animated spotlight glow
    ├── JobGrid        AnimatePresence grid — skeletons → cards → empty
    ├── JobDetailSheet Shadcn Sheet with structured description parser
    └── JobBoard       Client orchestrator — wires useJobs to all UI
```

### Data & State Flow

```
app/page.tsx (Server Component)
  └── <Suspense>
        └── <JobBoard> (Client Component)
              ├── useJobs()           ← reads/writes URL search params
              │     └── useDebounce() ← 300 ms delay on search query
              ├── <Hero />
              ├── <FilterBar />       ← controlled by useJobs state
              ├── <JobGrid />         ← receives filtered jobs array
              └── <JobDetailSheet />  ← opened by card click
```

**`useJobs`** is the single source of truth. It reads the initial filter state from URL search params on mount (`useSearchParams`), holds `searchQuery` (raw, bound to the input) and `debouncedQuery` (via `useDebounce`, used for actual filtering), `activeType`, and `activeDepartment`. Every state change is reflected back to the URL via `router.replace` so any filtered view is shareable by copying the browser URL.

**`useDebounce`** is a generic hook (`useDebounce<T>(value, delay)`) that delays propagating a value change until the user has stopped typing for 300 ms. This prevents the filter function from running on every keystroke.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Components | Shadcn/UI (Base UI primitives) |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Font | Geist Sans & Geist Mono |

---

## Local Setup

**Prerequisites:** Node.js 20+ and npm.

```bash
# 1. Clone the repository
git clone https://github.com/shreyas-debug/JobBoard.OS.git
cd JobBoard.OS

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Scripts

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## Folder Structure

```
JobBoard.OS/
├── app/
│   ├── globals.css         Tailwind v4 directives, dark theme vars, spotlight keyframe
│   ├── layout.tsx          Root layout — Geist font, metadata, OG tags, viewport
│   └── page.tsx            Entry point — Suspense boundary around <JobBoard>
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── ui/                 Shadcn-generated primitives (do not edit directly)
├── data/
│   └── jobs.json           12 realistic dummy jobs across all filter dimensions
├── hooks/
│   ├── useJobs.ts          Filter logic + URL state sync
│   └── useDebounce.ts      Generic 300 ms debounce hook
├── types/
│   └── job.ts              Job, Department, Location, JobType interfaces
└── README.md
```

---

## Features at a Glance

- **Real-time search** with 300 ms debounce — no stale renders on fast typing
- **URL-synced filters** — share `/?q=frontend&type=Full-time&dept=Engineering` and the exact view is restored
- **Skeleton loaders** — Shadcn Skeleton cards shown for 800 ms before content paints
- **Staggered entry animations** — Framer Motion `AnimatePresence` with 70 ms per-card delay
- **Job detail side drawer** — Shadcn Sheet with Esc-close, focus trap, and structured description
- **Letter Avatars** — deterministic gradient fallback so missing logos never break the layout
- **Empty state** — `SearchX` icon with a "Reset filters" button that clears state and URL params
- **Full keyboard navigation** — all cards are `tabIndex={0}` with Enter/Space handlers; filter inputs have `aria-label`
- **Responsive grid** — 1 col (mobile) → 2 col (sm) → 3 col (lg); FilterBar stacks on mobile

---

## Screenshots

> Add screenshots here after deploying or running locally.
