# JobBoard.OS

A premium, dark-themed job board built with Next.js 16, Tailwind CSS v4, and Shadcn/UI. Features brand-gradient company logos, real-time debounced search, URL-synced filters, a centered modal with scrollable job detail, staggered hero animations, skeleton loaders, department-coloured card hover accents, a full apply/withdraw flow with localStorage persistence, and toast notifications.

**Live demo:** https://job-board-os.vercel.app  
**GitHub:** https://github.com/shreyas-debug/JobBoard.OS

---

## Design Decisions

### Dark Theme & Visual Identity

The application uses a permanent deep off-black (`#0A0A0A`) base. The hero section has two layered radial auras (indigo + violet) behind the gradient headline, satisfying the "gradients, subtle blurs" requirement from the brief. The modal backdrop uses `bg-black/80 backdrop-blur-sm` to keep focus on the content.

### Hero Gradient & Animation

The headline uses `bg-gradient-to-br from-white via-white/95 to-white/50 bg-clip-text text-transparent` for a crisp gradient effect. The badge, headline, and subtext fade-slide-up with staggered 0.1s delays on load. The live positions badge has an `animate-ping` pulsing dot.

### Department-Coloured Card Hover Accents

Each job card shows a 3px coloured accent bar that slides in from the bottom-left on hover, with a matching radial glow behind the content. Colours are keyed by department: Engineering → indigo, Design → rose, Marketing → amber, Product → teal.

### Brand-Gradient Company Logos

Company logos are white SVGs from the Simple Icons CDN (`cdn.simpleicons.org/{slug}/ffffff`). Each logo sits on a brand-specific `bg-gradient-to-br` tile with a soft ambient halo. 15 brands are mapped; unknown companies use a deterministic gradient from an 8-colour fallback palette. If the CDN fetch fails, a `LetterAvatar` renders instead.

### Colourful Tinted Badges

Every job attribute badge carries a semantic colour:

| Label | Colour |
|---|---|
| Full-time | Blue |
| Contract | Amber |
| Part-time | Emerald |
| Engineering | Violet |
| Design | Pink |
| Marketing | Fuchsia |
| Product | Teal |
| Remote | Cyan |
| London | Orange |
| NYC | Rose |
| Berlin | Lime |
| San Francisco | Sky |

### Centered Modal for Job Details

The job detail view uses a centered Dialog built on `@base-ui/react/dialog` primitives. The popup uses a three-zone flex layout: a fixed header (logo, title, bento 2×2 metadata, badges, share), a `flex-1 min-h-0 overflow-y-auto` body for the full role description with a custom thin scrollbar, and a sticky footer. When already applied, the footer shows a green **Applied** indicator alongside a **Withdraw** button that removes the application from localStorage.

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
│   ├── JobCard         Cards with dept-coloured hover accent bar + glow
│   ├── JobCardSkeleton Shadcn Skeleton mirroring the card layout
│   ├── FilterBar       Search + type pills + dept pills + applied toggle
│   └── EmptyState      "No roles found" with reset affordance
│
└── organisms/        Page-level sections that own or consume shared state
    ├── Hero            Gradient headline + radial aura + stagger animation
    ├── JobGrid         List → skeletons → cards → empty state
    ├── JobDetailDialog Centered modal with scroll body + Apply/Withdraw CTA
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
              └── <JobDetailDialog /> ← opened on card click
```

**`useJobs`** — reads initial values from URL search params on mount, filters the `jobs.json` array in memory, and reflects every change back to the URL via `router.replace` (shallow). Makes any filtered view shareable by copying the address bar.

**`useDebounce`** — generic hook that delays propagating a value 300 ms after the last change.

**`useAppliedJobs`** — reads/writes a `Set<string>` of applied job IDs to `localStorage`. Exposes `applyToJob(id)`, `unapplyFromJob(id)`, and `isApplied(id)`. Survives page refreshes.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Components | Shadcn/UI (Base UI primitives) |
| Notifications | Sonner |
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
│   ├── globals.css         Tailwind v4 directives, custom scrollbar, keyframes
│   ├── layout.tsx          Root layout — Geist font, metadata, Toaster
│   └── page.tsx            Entry point — Suspense boundary around <JobBoard>
├── components/
│   ├── atoms/
│   │   ├── CompanyLogo.tsx   Brand gradient logo tile with fallback
│   │   ├── JobBadge.tsx      Colour-coded badge by label
│   │   └── LetterAvatar.tsx  Dark-palette initial avatar
│   ├── molecules/
│   │   ├── JobCard.tsx          Dept-coloured hover accent + glow
│   │   ├── JobCardSkeleton.tsx
│   │   ├── FilterBar.tsx        Type + dept + applied filters, mobile scroll
│   │   └── EmptyState.tsx
│   ├── organisms/
│   │   ├── Hero.tsx             Gradient text + aura + stagger animation
│   │   ├── JobGrid.tsx
│   │   ├── JobDetailDialog.tsx  Scrollable modal + Apply/Withdraw flow
│   │   └── JobBoard.tsx
│   └── ui/                 Shadcn-generated primitives (skeleton, sonner…)
├── data/
│   └── jobs.json           15 realistic jobs across 4 depts, 3 types, 5 locations
├── hooks/
│   ├── useJobs.ts          Filter logic + URL state sync + debounce integration
│   ├── useAppliedJobs.ts   localStorage apply/withdraw persistence
│   └── useDebounce.ts      Generic 300 ms debounce
├── types/
│   └── job.ts              Job, Department, Location, JobType types
└── next.config.ts
```

---

## Features

- **15 jobs from JSON** — covering all filter dimensions (4 depts: Engineering, Design, Marketing, Product; 3 types: Full-time, Contract, Part-time; 5 locations)
- **Filter by Type** — All / Full-time / Contract / Part-time pill group; horizontally scrollable on mobile
- **Filter by Department** — All Departments / Engineering / Design / Marketing / Product pills; horizontally scrollable on mobile
- **Job Details Modal** — centered `max-w-2xl` dialog; bento 2×2 metadata grid; fully scrollable description with custom thin scrollbar; Share button that copies a shareable URL
- **Apply & Withdraw flow** — gradient Apply button → 1s loading → Applied state; Withdraw button → 0.6s loading → removed from localStorage; both confirmed by Sonner toasts
- **Responsive** — single-column mobile; filter rows scroll horizontally; modal is full-width on mobile
- **Real-time debounced search** — 300 ms delay, URL-synced (`?q=`)
- **URL-synced filters** — `?type=Full-time&dept=Engineering` is restorable and shareable
- **Skeleton loaders** — Shadcn Skeleton cards during simulated 700 ms load
- **Hero stagger animations** — badge, headline, subtext fade-slide-up with 0.1s staggered delays
- **Department-coloured card hovers** — left accent bar + radial glow keyed by department
- **"New" badge** — sky-blue badge on jobs posted within the last 3 days
- **"Show Applied" filter** — emerald chip with count badge in the filter bar
- **Empty state** — illustrated with a reset button that clears all filter state and URL params
- **Keyboard navigation** — all cards `tabIndex={0}` with Enter/Space handlers; Esc closes dialog; `aria-pressed` on pills; `role="switch"` on Applied toggle
- **Letter Avatar fallback** — tinted dark avatars when logo CDN fails; deterministic colour by company name
