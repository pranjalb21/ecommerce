# Figma File Structure & Conventions

## File
`Ecommerce — Luxury Storefront`

## Pages (in order)
1. `00_Cover & Readme` — title, version, changelog, owner
2. `01_Foundations` — colors, type, spacing, icons, grid
3. `02_Components` — atoms → molecules → organisms
4. `03_Patterns` — forms, states, empty/error
5. `04_Screens — Desktop` (1440)
6. `05_Screens — Tablet` (768)
7. `06_Screens — Mobile` (375)
8. `07_Flows & Prototypes`
9. `08_Handoff` — specs, redlines, token export

## Naming conventions
- Components: `Category/Component/Variant` (e.g., `Button/Primary/Large`)
- Screens: `ScreenName — State` (e.g., `PDP — Out of stock`)
- Variants via component properties (Size, State, Type) — avoid duplicate components.
- Layers: descriptive, lowercase-with-hyphens (e.g., `product-image`, `price-row`).

## Figma setup checklist
- [ ] Create **Variables** collections: `Color`, `Spacing`, `Radius` from `design-tokens.json`.
- [ ] Create **Text Styles** for every scale entry (Display XL … Caption) with weight variants.
- [ ] Create **Effect Styles**: `shadow/card`, `shadow/modal`.
- [ ] Set page background color variable `bg/canvas`.
- [ ] Define grid styles per breakpoint.
- [ ] Install plugins: Tokens Studio (optional), Iconify (Lucide), Content Reel.

## Component property conventions
- Boolean props: `hasIcon`, `disabled`, `loading`.
- Enum props: `size` (sm/md/lg), `variant` (primary/secondary/ghost).
- Text props: expose all editable copy.

## Auto-layout rules
- Use auto-layout for all components and screen sections.
- Avoid absolute positioning except overlays (modals, drawers, toasts).
- Set min/max widths for responsive behavior.

## Versioning
- Use Figma branches for major changes; merge with review.
- Keep a `Changelog` text node on `00_Cover & Readme` page.
- Snapshot dated copies before handoff.
