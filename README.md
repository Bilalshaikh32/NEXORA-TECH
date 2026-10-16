# NEXORA TECH

Premium electronics e-commerce website built with **React + Vite**.

NEXORA TECH is a clean, modern storefront experience focused on premium visuals, smooth interactions and responsive shopping workflows.

## Highlights

- 7 pages + 404 page
- 10 premium products
- Persistent shopping cart
- Wishlist support
- Real-time search
- Category and price filters
- Product sorting
- Dark / light mode
- Product image gallery
- Animated cart drawer
- Add-to-cart toast
- Responsive mobile menu
- Keyboard accessibility
- Smooth motion and clean UI styling

## Pages

- Home
- Shop
- Product Details
- About
- Contact
- Cart
- Checkout
- 404 Not Found

## Tech Stack

- React
- Vite
- React Router DOM
- Framer Motion
- Lucide React
- Tailwind CSS (project setup utility support)
- Local product image assets

## Getting Started

```bash
npm install
npm run dev
```

Open the local development URL shown in the terminal.

## Production Build

```bash
npm run build
```

## Project Structure

```text
src/
  components/
  context/
  data/
  pages/
  utils/
public/
  images/
```

## Deployment

This project is ready for Netlify deployment.

### Netlify settings

- **Build command:** `npm run build`
- **Publish directory:** `dist`

A `netlify.toml` file is already included.

## Notes

- Checkout flow is interface-only and intended for presentation purposes.
- The 10 fictional products use **photorealistic AI-generated studio renders** stored locally as optimized WebP assets (not photographs of real commercial items).
- No real payment, order, shipping or contact-message handling occurs; this is a frontend demo.

## Visual Refresh

- Refined Manrope / Sora type system
- Animated hero entrance, headphones float and subtle atmospheric layers
- Realistic studio-style product presentation across Home, Shop, Product Details and cart
- Accessibility and reduced-motion support

## QA and final verification

Read [QA_REPORT.md](./QA_REPORT.md) for the source audit, files changed, commands executed, and a detailed manual test checklist.

```bash
npm run test:logic
npm run build
```

The Vite production build requires a successful `npm install`. The sandbox used for this QA revision could not reach the npm registry, so build and real React browser verification must be completed on a machine with dependency access before submitting the site.

For Netlify, the existing `netlify.toml` uses `npm run build`, publishes `dist`, and includes a SPA fallback for deep product routes. The site remains frontend-only; contact and checkout are simulations and must not collect real payment details.
