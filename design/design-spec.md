# Electronics & Spare Parts Storefront — Design Specification

## 1. Product & Audience

- **Product:** Ecommerce storefront for small electronics and spare parts (B2C + light B2B).
- **Catalog examples:** resistors, capacitors, connectors, cables, switches, enclosures, sensors, microcontrollers, fasteners, tools.
- **Personas:**
  - *Hobbyist/maker* — searches by part number, needs specs & compatibility.
  - *Repair technician* — needs exact replacement parts, fast reorder.
  - *Small OEM buyer* — bulk quantities, tiered pricing, datasheets.
- **Tone:** Technical, dense, trustworthy, spec-driven. Utility over decoration.

## 2. Design Principles

1. **Specs first** — part numbers, ratings, dimensions visible at a glance.
2. **Search is primary** — global search by part number/name is the main entry point.
3. **Density with clarity** — compact rows/cards but strict alignment and hierarchy.
4. **Trust via data** — stock status, lead time, datasheet links, compatibility.
5. **Fast reorder** — quantity steppers, bulk pricing, "add to cart" always visible.

## 3. Design System (Tokens)

### 3.1 Color
| Token | Value | Use |
|---|---|---|
| bg/canvas | #F5F6F8 | Page background |
| bg/surface | #FFFFFF | Cards, panels |
| bg/muted | #EEF0F3 | Striped rows, code blocks |
| bg/inverse | #1F2937 | Footer, dark header |
| text/primary | #111827 | Body, headings |
| text/secondary | #6B7280 | Muted copy |
| text/inverse | #F9FAFB | On dark bg |
| accent/blue | #2563EB | Links, CTAs, focus |
| accent/blue-hover | #1D4ED8 | Hover |
| border/subtle | #E5E7EB | Dividers |
| border/strong | #D1D5DB | Inputs |
| state/success | #16A34A | In stock |
| state/warning | #D97706 | Low stock |
| state/error | #DC2626 | Out of stock |

### 3.2 Typography
- **Headings:** IBM Plex Sans (technical, neutral).
- **Body/UI:** Inter.
- **Part numbers / specs:** IBM Plex Mono.
- Scale: H1 28/34, H2 22/28, H3 18/24, Body 14/20, Body S 13/18, Caption 11/14, Mono 13/18.
- Weights: 400 body, 500 UI, 600 headings, 700 emphasis.

### 3.3 Spacing & Grid
- Scale (px): 4, 8, 12, 16, 24, 32, 48, 64.
- Grid: 12-col desktop (max 1280, gutter 16), 8-col tablet, 4-col mobile.
- Dense vertical rhythm: 24 (desktop) / 16 (mobile) between sections.

### 3.4 Shape, Elevation, Motion
- Radius: 4 (inputs/buttons), 6 (cards), 8 (modals).
- Shadows: cards `0 1px 3px rgba(0,0,0,.06)`; modals `0 12px 32px rgba(0,0,0,.12)`.
- Motion: 150ms ease-out (micro), 200ms (drawers/modals). Respect reduced motion.

### 3.5 Iconography
- Lucide icons, 1.5px stroke, 16/20px. Plus custom: datasheet, compatibility, stock.

## 4. Component Library

**Foundations:** Color styles, text styles, mono styles, grid.

**Atoms:** Button (primary/secondary/ghost, sizes sm/md), Input, Select, Checkbox, Radio, Badge (stock/new), Tag (category), Price, Quantity stepper, Spinner, Skeleton, Tooltip, Divider, PartNumber (mono chip).

**Molecules:** Form field, Search bar (with part-number autocomplete), Breadcrumb, Pagination, Filter chip, Spec row, Stock status, Bulk price row, Cart line item, Empty state, Toast.

**Organisms:** Header (search-centered, category mega-menu), Mobile nav, Footer, Product card (grid), Product row (list), Spec table, Filter sidebar, Sort dropdown, Cart drawer, Checkout steps, Order summary, Review card, Modal, Drawer, Carousel (product images), Newsletter block, Compatibility list.

**Patterns:** Form validation, loading skeletons, error/empty states, data tables.

## 5. Information Architecture

```
Home
├── Categories (by type)
├── Search results (part number / keyword)
├── Product (PDP)
├── Cart (drawer + page)
├── Checkout (Info → Shipping → Payment → Review)
├── Order confirmation
├── Account (Dashboard, Orders, Reorder, Addresses, Profile)
├── Auth: Login, Signup, Forgot/Reset
└── Content: Datasheets, Compatibility, Help, Contact
+ Utility: 404, Empty states, Error
```

## 6. Screen List (v1)

**Desktop**
1. Home (search hero, categories, featured/new parts, brands)
2. Category / PLP (grid + list toggle, filters, sort)
3. Search results (with/without results, part-number highlight)
4. PDP (image, specs table, pricing tiers, compatibility, related)
5. Quick view modal
6. Cart page
7. Cart drawer
8. Checkout ×4 + Confirmation
9. Account dashboard, Orders, Order detail, Reorder
10. Addresses, Profile
11. Login/Signup/Forgot/Reset
12. Help/Contact/404/empty/error

**Mobile** — parallel + bottom filters, sticky ATC, compact spec table.

## 7. Key User Flows

- Search part number → PDP → Add to cart (with qty) → Checkout
- Browse category → filter by spec → compare → cart
- Reorder from past order
- Bulk quantity tier pricing

## 8. Responsive Behavior

- Header search expands; categories in mega-menu → drawer on mobile.
- PDP specs table becomes stacked key/value on mobile.
- PLP switches grid→list; filters become bottom sheet.
- Checkout single-column on mobile.

## 9. States & Edge Cases

- Empty cart/search, loading skeletons, error states
- Out of stock, low stock, lead time
- Variant/substitution suggestions
- Minimum order quantity (MOQ)
- Bulk pricing tiers
- Datasheet missing

## 10. Content & Asset Specs

- Images: product 1:1 (600×600) on white, thumbnails 1:1, hero 16:9.
- Part numbers in mono; specs in tables.
- Icons: Lucide.

## 11. Accessibility

- Contrast ≥ 4.5:1; focus rings (2px blue); keyboard nav; labels visible; reduced motion.

## 12. Figma File Structure

See `figma-structure.md`.

## 13. Deliverables & Phases

- Phase 1 (W1): Foundations + atoms + header/search
- Phase 2 (W2): Home, PLP (grid/list), filters, search results
- Phase 3 (W3): PDP (specs, tiers, compatibility) + quick view
- Phase 4 (W4): Cart + Checkout + Confirmation
- Phase 5 (W5): Account + Auth + content
- Phase 6 (W6): Mobile pass, states, a11y, handoff

## 14. Handoff to Dev

- Tokens export, component specs, interaction notes, asset rules, API mapping.

## 15. Open Decisions

1. B2B tiered pricing in v1?
2. Datasheet hosting (PDF) — link or embed?
3. Compatibility matrix scope?
4. Dark mode for workshop use?
5. Brand name — placeholder "VOLTCORE" until provided
