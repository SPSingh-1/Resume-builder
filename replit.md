# Lumina Resume

A professional resume builder where users fill details, see a live preview, switch templates, download PDF, and share via temporary QR-coded links — no login required.

## Run & Operate

- `pnpm --filter @workspace/resume-builder run dev` — run the Resume Builder frontend (port 20047)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000, health check only)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Framer Motion, wouter
- State: React Context + localStorage (no backend DB for resume data)
- PDF: jsPDF + html2canvas
- Sharing: Firebase Firestore (temporary, 24-hour expiry)
- QR Code: react-qr-code
- Drag & Drop: @hello-pangea/dnd

## Where things live

- `artifacts/resume-builder/src/` — main React app
- `artifacts/resume-builder/src/types/resume.ts` — ResumeData type definitions
- `artifacts/resume-builder/src/contexts/ResumeContext.tsx` — global state + undo/redo
- `artifacts/resume-builder/src/lib/firebase.ts` — Firebase lazy init
- `artifacts/resume-builder/src/lib/sharing.ts` — Firestore share/fetch + expiry
- `artifacts/resume-builder/src/lib/pdf.ts` — PDF download logic
- `artifacts/resume-builder/src/lib/sampleData.ts` — sample resume data
- `artifacts/resume-builder/src/components/preview/templates/` — 6 resume templates
- `artifacts/resume-builder/src/components/builder/form/` — form sections (11 tabs)
- `artifacts/resume-builder/src/pages/` — HomePage, BuilderPage, SharePage

## Architecture decisions

- All resume data lives in React state + localStorage (no backend). Firebase is ONLY for temporary share links.
- Firebase is lazily initialized — if VITE_FIREBASE_* env vars are absent, sharing is gracefully disabled.
- Resume templates use inline styles (not CSS variables) so they render correctly in PDF/print contexts.
- Undo/redo uses an in-memory history array (max 50 entries) tracked in ResumeContext.
- The preview panel uses CSS transform: scale() to fit A4 proportions into the available space.

## Product

- Homepage with hero, template showcase, and feature highlights
- Builder: two-panel layout (form left, live preview right)
- 6 templates: Modern, Minimal, Corporate, Creative, ATS, Dark
- Customization: colors, fonts, font size, section order (drag-and-drop)
- PDF download, print, dark/light mode, fill sample data, reset, undo/redo
- Share via Firestore (24-hour expiry) with QR code + copy link
- Public share page at /share/:id with expiry messaging

## User preferences

- No login/signup — fully anonymous
- Firebase only for temporary sharing (24h TTL)
- No permanent storage of user data

## Gotchas

- Firebase VITE_ env vars must be set for sharing to work (VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID)
- Google Fonts @import must be the VERY FIRST line of index.css
- Templates use inline styles — do not use Tailwind CSS variables inside template components
- The preview element ID is `resume-preview-content` — PDF lib targets this ID

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
