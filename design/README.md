# Luxury Ecommerce Storefront — Figma Design Handoff Package

> **Important note:** A native Figma (`.fig`) file is a proprietary binary format that can only be created inside the Figma application. I cannot generate a real `.fig` file from here. This folder contains the complete, implementation-ready design package — design system tokens, full screen/component specifications, Figma file structure, and a working HTML/CSS prototype — so a designer can recreate the Figma file 1:1 (or a developer can build directly from it).

## Contents

| File | Purpose |
|---|---|
| `README.md` | This file — overview & how to use |
| `design-spec.md` | Full UI/UX design specification (tokens, components, screens, flows, accessibility) |
| `design-tokens.json` | Machine-readable design tokens (colors, typography, spacing, radius, shadows) |
| `figma-structure.md` | Recommended Figma file/page/component naming conventions |
| `prototype/` | Working HTML/CSS prototype implementing the design system + key screens |

## How to use

### To build the Figma file
1. Open Figma → create a new file named `Ecommerce — Luxury Storefront`.
2. Create pages per `figma-structure.md`.
3. Set up **Variables** from `design-tokens.json` (colors, spacing, radius).
4. Create **Text Styles** and **Effect Styles** from `design-spec.md` §3.
5. Build components per §4, screens per §6, following the prototype for visual reference.

### To view the prototype
Open `prototype/index.html` in any browser. It renders the Home, PLP, PDP, and Cart screens using the design tokens.

### To import tokens into code
`design-tokens.json` is Style-Dictionary-compatible. Run:
```
npx style-dictionary build --config sd.config.json
```
to generate CSS variables, Tailwind config, or platform tokens.

## Scope

- Platform: responsive web (desktop 1440 / tablet 768 / mobile 375)
- Style: luxury / premium (editorial, serif display, generous whitespace)
- Catalog: full (home, PLP, PDP, quick view, search, cart, checkout×4, confirmation, account area, auth, content pages, 404/empty/error states)
- Brand: proposed design system (placeholder brand "VOLTCORE")

## Open decisions
See `design-spec.md` §15.
