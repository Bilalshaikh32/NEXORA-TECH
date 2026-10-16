# NEXORA TECH — Task 02 Source Audit & QA Report

Review date: 16 October 2026
Base: `NEXORA_TECH_Visual_Refresh_V2.zip` (existing React + Vite app)
Scope: Frontend only. No backend, database, authentication, order processing, or payment services were added.

## PDF requirement gap analysis

| Requirement | Finding in original V2 | This update |
| --- | --- | --- |
| Home / Shop / Product Details / About / Contact / Cart / Checkout | All 7 routes already present | Preserved |
| 7–10 product listings with images, prices and descriptions | 10 products and 20 local WebP product photos | Preserved; automated asset coverage test added |
| Product detail view and gallery | Links, quantity selector and 2-image gallery present | Preserved |
| Search, filters and sorting | Working pure filter/sort function | Preserved |
| Wishlist, theme and cart persistence | LocalStorage-backed React state present | Preserved |
| Cart increments, subtotal, shipping and total | Implemented, but feedback at the stock cap could be stale/misleading | Reliable stock-capped add helper and notifications |
| Empty cart, demo checkout and confirmation | Already implemented | Preserved |
| Checkout form validation | Implemented; first invalid field focus could run before React committed errors | Deferred focus to next animation frame |
| Contact validation and success state | Implemented; error text could remain after correcting a field | Clear changed field's error and focus first invalid field |
| Responsive breakpoints | Styles present; full running app unverified | Standalone hero CSS check at 320, 390, 768, 1024, 1440px; no page-wide browser claim |
| Keyboard navigation and reduced motion | Dialog focus handling and CSS reduced-motion rules present | Preserved |
| Netlify/Vercel readiness | Vite config, `dist` publish and SPA rewrites present | Preserved; static route config tests added |

## Changed files

- `src/context/StoreContext.jsx` — keeps cart changes synchronized for rapid actions; accurate stock feedback.
- `src/utils/shop.js` — adds pure, testable `addCartItem` helper.
- `src/pages/Checkout.jsx` — focuses first invalid field after validation state renders.
- `src/pages/Contact.jsx` — clears stale field errors and focuses first invalid field on submit.
- `tests/shop.test.js` — covers merging, stock cap, totals, and rejected extra additions.
- `tests/assets.test.js` (new) — verifies 20 local WebP product images, hero image and Netlify rewrites.
- `README.md` — documents verified tests and remaining environment-specific steps.
- `QA_REPORT.md` (new) — this report.

No visual design, product artwork, color palette, typography, animation, or route layouts were replaced.

## Commands executed and actual outcomes

1. **Original baseline:** `node --test tests/*.test.js` — 7 tests passed, 0 failed.
2. **After targeted updates:** `npm run test:logic` — 10 tests passed, 0 failed.
3. **JS/JSX source syntax:** TypeScript `transpileModule` across 16 source files — 0 syntax errors.
4. **CSS parser:** `tinycss2.parse_stylesheet(src/styles.css)` — 0 top-level syntax errors.
5. **Standalone Chromium CSS test:** hero and representative grid markup at widths 320, 390, 768, 1024, 1440 — document width equalled viewport width. This is not the React application.
6. **`npm install --no-audit --no-fund --fetch-retries=0 --fetch-timeout=12000`: FAILED.** npm registry DNS request returned `EAI_AGAIN`.
7. **`npm run build`: FAILED / BLOCKED.** `vite: not found` because npm packages could not be installed.

## Tests NOT completed in this environment

- Real React app rendering, browser console and accessibility audits
- Interactive browser E2E scenarios including form submission, wishlist, light/dark switch and cart reset
- Actual device/mobile app testing and public hosting verification
- Successful Vite production build

Do not treat these as passed.

## Local verification required before deploying

```bash
npm install
npm run test:logic
npm run build
npm run dev
```

Then manually inspect:

1. Browse Shop → open a product → add it twice → confirm badge and cart contents.
2. Add a second product → adjust quantities → remove one → verify totals.
3. Refresh page → verify persisted cart and wishlist.
4. Use search, categories, price slider and sorting together.
5. Submit invalid Contact form → correct input → submit valid demo data → confirm local success message.
6. Proceed to Checkout with an item → submit invalid inputs → check first invalid field receives focus.
7. Submit valid **sample-only** data → confirm demo reference and cleared cart. Never use real payment details.
8. Test theme toggle, mobile navigation, keyboard navigation, product-gallery thumbnails, 404 and empty-cart state.
9. Check 320, 390, 768, 1024 and 1440px browser viewport widths. Watch console errors and failed image requests.
10. Confirm deep link `/product/pulse-x1` opens/refreshes on the deployed Netlify site.

## Deployment

For Netlify (already configured via `netlify.toml`):

- Production branch: `main`
- Base directory: blank (when project files are in GitHub repository root)
- Build command: `npm run build`
- Publish directory: `dist`

If the GitHub repository contains an outer `NEXORA_TECH` directory instead of the files at root, set Netlify Base directory to `NEXORA_TECH`.

Vercel alternative: framework preset Vite, build `npm run build`, output `dist`. Add a Vercel SPA rewrite before relying on direct product route refreshes; only Netlify rewrites are included here.

## Remaining limitation

The environment did not allow installation from npm, so the package is **source-audited and unit-tested**, not production-build-verified. Run local installation, production build, and real browser checks prior to final submission. The checkout and contact flows intentionally simulate completion with no real transactions or outgoing messages.
