# NEXORA TECH — Product Photography & Visual Refresh QA

## Changes

- Website product imagery replaced with 20 local optimized photorealistic WebP renders (main + close-up/gallery images for 10 products).
- Added a transparent-headphones hero cutout and hero entrance/floating animations.
- Updated typography to Manrope, Sora, and IBM Plex Mono with refined responsive text scaling.
- Polished product card, gallery, category and button aesthetics in both themes.
- Removed prior training/assignment branding from site and documentation.
- Kept clear demo-only checkout and contact messaging, since no backend/payment system is connected.

## Verified

- 7 automated shopping/cart/filter/validation tests pass (`npm run test:logic`).
- 18 JavaScript/JSX sources parse via TypeScript's JSX-capable transpiler without syntax diagnostics.
- All 10 main and 10 alternative product WebP assets exist and decode correctly; the hero WebP exists.
- Referenced source image paths and all local imports exist.
- Source and documentation checked for prior institutional branding.
- Netlify SPA rewrites and build configuration present.

## Not verified in this environment

- Full `npm install` / `npm run build` because npm registry access is unavailable here.
- End-to-end browser tests and visual responsive checks against the final Vite production bundle.

Before publishing, run `npm install`, `npm run build`, and `npm run test:logic` locally, and test the shopping flow on desktop and mobile.

## Integrity

The website uses sample products, AI-generated realistic product renders, demo prices and a simulated checkout. It does not place genuine orders, collect payment details or send contact messages.
