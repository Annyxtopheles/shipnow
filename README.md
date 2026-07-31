# ShipNow — Frontend Developer Intern Assignment

Implementation of the ShipNow logistics dashboard from the provided Figma design, built with React + Vite + TypeScript + Tailwind CSS.

## Live Demo

[ADD YOUR LIVE VERCEL/NETLIFY URL HERE]

## Tech Stack

- **Framework:** React (Vite), TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Icons:** lucide-react + custom exported icon/logo assets
- **Data:** Local mock data only, no backend/API calls

## Setup Instructions

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd shipnow

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
# App runs at http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview the production build locally
npm run preview
```

Requires Node.js 18 or later.

## Screen-by-Screen Status

| Screen | Status | Notes |
|---|---|---|
| **Login** | ✅ Complete | Split-screen layout, client-side validation (required fields, email format, password length), show/hide password toggle, simulated session on successful submit. |
| **Dashboard** | ✅ Complete | Application shell (sidebar + footer), metric cards, charts, live tracking panel, alerts panel, recent shipments table, activity timeline. Nav items without a built screen (Analytics, Calendar, Tracking, Fleets, Drivers) route to a placeholder page. |
| **Shipments — Grid View** | ✅ Complete | Page header, breadcrumb, status tabs, search, filter, and sort controls. Responsive card grid across desktop, tablet, and mobile, each with its own tailored layout (see Assumptions below). |
| **Shipments — Table View** | ❌ Not attempted | |
| **Shipments — View Switcher** | ❌ Not attempted | Depends on the Table View existing; not implemented since only the Grid View was built. |
| **Create New Shipment** | ❌ Not attempted | |
| **Invoices & Billing** | ❌ Not attempted | |
| **Warehouse** | ❌ Not attempted | |

## Responsiveness

Implemented and manually verified with no horizontal overflow at:
- **Mobile** (375px and below): sticky top app bar, hamburger drawer, single-column card grid, and a phone-specific compact toolbar (merged search/filter/new-shipment card with tabs) and card header layout that differs intentionally from tablet/desktop to fit the space.
- **Tablet** (768–1023px): icon-only collapsed sidebar rail, 2-column card grid, and a toolbar where search/filter collapse to icon-only buttons to prevent wrapping/overflow.
- **Desktop** (1280px+): full expanded sidebar, 4-column card grid, fully labeled toolbar controls.

## Known Issues & Assumptions

- **Only the Grid View of Shipments was built.** The Table View and the required view switcher (toggle between Table/Grid on a single `/shipments` route) were not attempted. This is a known gap against the assignment's "Required" note on the view switcher.
- **Shipment dataset is limited to the 12 records shown in the Figma reference.** Rather than generating additional filler records to pad out pagination (which the assignment allows but does not require), the dataset was deliberately kept to exactly the 12 real, Figma-seeded shipments. As a result, there is currently only one page of results — the pagination control is present and functional but has nothing further to page through.
- **Brand logos:** real per-company logo icons exist only for these 12 seeded companies (matching the Figma reference exactly by name): TechGear Inc., StyleHub Co., FreshNest, FitPlus Gear, EcoLights, AutoParts Pro, GreenHaven, ModaWear, SunCore Panels, QuickParts, VitaFresh, StyleDepot. Since the dataset is limited to just these 12 (see above), every shipment card shows its correct logo.
- **Status badge colors** (In Transit / Out for Delivery / Delivered / Processing) use a consistent light-tint color system (same opacity tier and font styling across all four), with hue as the only distinguishing factor.
- Some mock date fields carry inconsistent years between origin and destination (e.g. `2035` vs `2025`) inherited from the original seed data; this is cosmetic sample text only and does not affect sorting logic, which uses an explicit seed-order field rather than parsing these dates.

## What's Next

If continuing this project, the suggested order per the assignment brief would be: Shipments Table View → View Switcher → Create New Shipment → Invoices & Billing → Warehouse.
