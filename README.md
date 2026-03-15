# JobBoard.OS

A premium, dark-themed job board built with Next.js 16, Tailwind CSS v4, and Shadcn/UI. Features glassmorphism cards, brand-gradient company logos, real-time debounced search, URL-synced filters, a blurred side-drawer job detail view, staggered animations, skeleton loaders, and a full apply flow with localStorage persistence and toast notifications.

**Live demo:** _Deploy URL here_  
**GitHub:** https://github.com/shreyas-debug/JobBoard.OS

---

## Design Decisions

### Dark Theme & Glassmorphism

The application uses a permanent deep off-black (`#0A0A0A`) base — not pure black, which looks harsh, and not `zinc-950`, which is too blue-tinted. Against this base, all interactive surfaces (cards, filter bar, side drawer) use `bg-white/[0.02]–bg-white/[0.08]` with `border-white/[0.05]–border-white/[0.1]` — a glassmorphism technique that creates physical depth without heavy shadows.

The sticky filter bar uses `backdrop-blur-xl` so it reads as a frosted-glass panel floating above the job list. The side-drawer overlay uses `bg-black/60 backdrop-blur-sm` — blurring the content behind the sheet satisfies the assignment's "subtle blurs" requirement while keeping the drawer panel itself crisp and readable.

### The Background Gradient

A single `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120,119,198,0.3), rgba(255,255,255,0))` is applied directly as the page background, creating a soft purple/indigo spotlight that bleeds down from the top of the viewport. This satisfies the "gradients" requirement without any linear text-gradients or button gradients, which tend to look cheap. The gradient is visible, not merely hinted at.

### Brand-Gradient Company Logos

Company logos are white SVGs sourced from the Simple Icons CDN (`cdn.simpleicons.org/{slug}/ffffff`). Each logo sits on a brand-specific `bg-gradient-to-br` tile — Linear gets `indigo → violet`, Stripe gets `indigo → cyan`, Loom gets `orange → red`, Figma gets `orange → violet`, and so on. A `shadow-[0_0_16px_rgba(255,255,255,0.08)]` halo gives each tile a soft ambient glow. Unknown companies receive a deterministic gradient from an 8-colour fallback palette. If the CDN fetch fails, a `LetterAvatar` with a matching tinted dark palette is rendered instead.

### Colourful Tinted Badges

Every job attribute badge carries a semantic colour:

| Label | Colour |
|---|---|
| Full-time | Blue |
| Contract | Amber |
| Engineering | Violet |
| Design | Pink |
| Marketing | Emerald |
| Remote | Cyan |
| London | Orange |
| NYC | Rose |

This lets users scan the list visually — a glance at the badge colours is enough to understand the role at a distance without reading every word.

### Typography

Geist Sans (400–700) is used throughout. It is the typeface designed by Vercel for developer-facing interfaces: geometric, legible at small sizes, with excellent tabular numerals for salary figures. `tracking-tight` on all headings sharpens the premium feel.

### Side Drawer vs Modal

The job detail view uses a Shadcn `Sheet` sliding in from the right rather than a full-page navigation or a centred modal. This preserves spatial context — the job grid remains partially visible behind the blurred overlay — which reduces disorientation. The drawer uses a two-zone layout: a fixed header (logo, title, bento metadata, badges) and a scrollable body (description), with a sticky footer CTA that is always reachable regardless of scroll position. Shadcn's built-in close button handles Esc-key dismissal and focus trapping.

---

## Architecture

The project follows **Atomic Design**, organising components from smallest primitive to full page section.

```
components/
├── atoms/            Stateless building blocks
│   ├── CompanyLogo     Brand-gradient tile + img with LetterAvatar fallback
│   ├── JobBadge        Colour-coded pill for type / dept / location
│   └── LetterAvatar    Dark-palette letter avatar for failed/missing logos
│
├── molecules/        Compositions of atoms with localised state
│   ├── JobCard         Glassmorphism card — logo, badges, metadata, hover arrow
│   ├── JobCardSkeleton Shadcn Skeleton mirroring the card layout
│   ├── FilterBar       2-row sticky bar: search (row 1) + filter chips (row 2)
│   └── EmptyState      "No roles found" with reset affordance
│
└── organisms/        Page-level sections that own or consume shared state
    ├── Hero            Compact dark heading with status badge
    ├── JobGrid         AnimatePresence list — skeletons → cards → empty state
    ├── JobDetailSheet  Shadcn Sheet with bento metadata + sticky Apply CTA
    └── JobBoard        Client orchestrator — wires all hooks to all UI
```

### Data & State Flow

```
app/page.tsx  (Server Component)
  └── <Suspense fallback={<FallbackGrid />}>
        └── <JobBoard>  (Client Component)
              ├── useJobs()           ← URL-synced search/type/dept filters
              │     └── useDebounce() ← 300 ms delay on search input
              ├── useAppliedJobs()    ← localStorage applied IDs set
              ├── [showAppliedOnly]   ← local boolean state
              ├── <Hero />
              ├── <FilterBar />       ← controlled inputs + Applied toggle chip
              ├── <JobGrid />         ← filtered + applied-only list
              └── <JobDetailSheet />  ← opened on card click
```

**`useJobs`** — single source of truth for search and filter state. Reads initial values from URL search params on mount (`useSearchParams`), filters the `jobs.json` array in memory, and reflects every change back to the URL via `router.replace` (shallow, no page reload). This makes any filtered view shareable by copying the address bar.

**`useDebounce`** — generic hook (`useDebounce<T>(value, delay)`) that delays propagating a value until 300 ms after the last change. The raw `searchQuery` is bound to the input immediately for a responsive feel; the `debouncedQuery` drives the actual filter logic.

**`useAppliedJobs`** — reads and writes a `Set<string>` of applied job IDs to `localStorage` under the key `"jobboard_applied_ids"`. Survives page refreshes. Exposes `applyToJob(id)` and `isApplied(id)`.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Components | Shadcn/UI (Base UI / Radix primitives) |
| Animations | Framer Motion 12 |
| Notifications | Sonner (via Shadcn) |
| Icons | Lucide React |
| Font | Geist Sans & Geist Mono |
| Logos | Simple Icons CDN |

---

## Local Setup

**Prerequisites:** Node.js 20+ and npm.

```bash
# 1. Clone
git clone https://github.com/shreyas-debug/JobBoard.OS.git
cd JobBoard.OS

# 2. Install
npm install

# 3. Develop
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # ESLint
```

---

## Folder Structure

```
JobBoard.OS/
├── app/
│   ├── globals.css         Tailwind v4 directives and base reset
│   ├── layout.tsx          Root layout — Geist font, metadata, Toaster, ThemeProvider
│   └── page.tsx            Entry point — Suspense boundary around <JobBoard>
├── components/
│   ├── atoms/
│   │   ├── CompanyLogo.tsx   Brand gradient logo tile with fallback
│   │   ├── JobBadge.tsx      Colour-coded badge by label
│   │   └── LetterAvatar.tsx  Dark-palette initial avatar
│   ├── molecules/
│   │   ├── JobCard.tsx
│   │   ├── JobCardSkeleton.tsx
│   │   ├── FilterBar.tsx
│   │   └── EmptyState.tsx
│   ├── organisms/
│   │   ├── Hero.tsx
│   │   ├── JobGrid.tsx
│   │   ├── JobDetailSheet.tsx
│   │   └── JobBoard.tsx
│   └── ui/                 Shadcn-generated primitives (select, sheet, skeleton, sonner…)
├── data/
│   └── jobs.json           12 realistic jobs covering all filter dimensions
├── hooks/
│   ├── useJobs.ts          Filter logic + URL state sync + debounce integration
│   ├── useAppliedJobs.ts   localStorage applied-jobs persistence
│   └── useDebounce.ts      Generic 300 ms debounce
├── types/
│   └── job.ts              Job, Department, Location, JobType interfaces
└── next.config.ts          Image domains (Simple Icons CDN, unavatar.io)
```

---

## Features

### Core Requirements
- **Job list from JSON** — 12 realistic dummy jobs with title, department, location, type, salary range, and full description
- **Filter by Type** — "All / Full-time / Contract" pill group; active pill uses tinted glass highlight
- **Filter by Department** — glassmorphism dropdown with `backdrop-blur-2xl` and `shadow-[0_10px_40px_rgba(0,0,0,0.8)]`
- **Job Details Sheet** — Shadcn Sheet sliding in from the right; blurred backdrop overlay; bento 2×2 metadata grid (Location, Salary, Type, Department); sticky Apply CTA footer
- **Responsive** — single-column mobile; filter chip row scrolls horizontally on small screens; sheet is full-width on mobile

### Senior-Level Additions
- **Real-time debounced search** — 300 ms delay, URL-synced (`?q=`)
- **URL-synced filters** — `?type=Full-time&dept=Engineering` is restorable and shareable
- **Skeleton loaders** — Shadcn Skeleton cards rendered during the simulated 700 ms load
- **Staggered entry animations** — Framer Motion `AnimatePresence` with 40 ms per-card stagger
- **Apply flow** — 1 s simulated network request → Sonner toast → `localStorage` persistence → card badge + disabled sheet state across page refreshes
- **"Show Applied" filter** — chip in the filter bar shows count badge; emerald glow when active
- **Empty state** — illustrated with a reset button that clears all filter state and URL params
- **Keyboard navigation** — all cards `tabIndex={0}` with Enter/Space handlers; Esc closes the drawer; `aria-pressed` on pills; `role="switch"` on the Applied toggle
- **Letter Avatar fallback** — dark-palette tinted avatars when logo CDN fails; deterministic colour by company name
