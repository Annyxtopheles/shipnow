# ShipNow — Frontend Developer Intern Assignment

Implementation of the ShipNow logistics dashboard from the provided Figma design, built with React + Vite + TypeScript + Tailwind CSS.

## Live Demo

https://shipnow-tau.vercel.app/

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
| **Shipments — Table View** | ✅ Complete | Full tabular presentation with batch selection checkboxes, column sorting, company logos, route arrows, progress bars, status badges, and inspection actions. |
| **Shipments — View Switcher** | ✅ Complete | Seamless toggle between Grid View and Table View on `/shipments` across mobile, tablet, and desktop viewports, preserving active filters and search. |
| **Create New Shipment** | ✅ Complete | Accessible modal dialog with field validation, dynamic `#SH` ID assignment, and reactive state updates across the app. |
| **Invoices & Billing** | ✅ Complete | Financial dashboard with summary metrics (collected revenue, pending, overdue balances), status tabs, search & filter toolbar, itemized invoice breakdown modal with 'Mark as Paid' action, and new invoice generation dialog. |
| **Warehouse** | ❌ Not attempted | |

## Responsiveness

Implemented and manually verified with no horizontal overflow at:
- **Mobile** (375px and below): sticky top app bar, hamburger drawer, single-column card grid or horizontal-scrollable data table, and a phone-specific compact toolbar (merged search/filter/view-switcher/new-shipment card with tabs) and card header layout.
- **Tablet** (768–1023px): icon-only collapsed sidebar rail, 2-column card grid / structured table view, and a toolbar where search/filter collapse to icon-only buttons to prevent wrapping/overflow.
- **Desktop** (1280px+): full expanded sidebar, 4-column card grid / full table view, fully labeled toolbar controls.

## Known Issues & Assumptions

- **Shipment dataset is seeded with the 12 records shown in the Figma reference**, with reactive state support allowing new shipments created via the "New Shipment" modal to immediately prepend to the dataset and reflect across both Dashboard and Shipments screens.
- **Brand logos:** real per-company logo icons exist for the 12 seeded companies (matching the Figma reference exactly by name): TechGear Inc., StyleHub Co., FreshNest, FitPlus Gear, EcoLights, AutoParts Pro, GreenHaven, ModaWear, SunCore Panels, QuickParts, VitaFresh, StyleDepot. Newly created custom companies display a styled initials badge.
- **Status badge colors** (In Transit / Out for Delivery / Delivered / Processing) use a consistent light-tint color system (same opacity tier and font styling across all four), with hue as the only distinguishing factor.
- Some mock date fields carry inconsistent years between origin and destination (e.g. `2035` vs `2025`) inherited from the original seed data; this is cosmetic sample text only and does not affect sorting logic, which uses an explicit seed-order field rather than parsing these dates.

## What's Next

If continuing this project, the suggested next screen per the assignment brief is: Warehouse.


