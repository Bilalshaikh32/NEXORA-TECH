# NEXORA TECH Deployment Guide (Roman Urdu)

## 1) Project run karna

Terminal kholo aur project folder ke andar ye commands chalao:

```bash
npm install
npm run dev
```

Jo local URL terminal mein aaye usko browser mein open karo.

## 2) Production build banana

```bash
npm run build
```

Build successful ho jaye to `dist` folder create ho jayega.

## 3) Netlify par deploy karna

Netlify mein new site create karo aur apna GitHub repository connect karo.

### Netlify settings

- **Branch:** `main`
- **Base directory:** blank chhor do
- **Build command:** `npm run build`
- **Publish directory:** `dist`

## 4) Agar direct drag-and-drop karna ho

1. `npm run build` chalao
2. `dist` folder banne do
3. Netlify dashboard kholo
4. `dist` folder ko drag and drop kar do

## 5) Important notes

- Product images local project mein included hain.
- Cart aur wishlist localStorage mein save rehte hain.
- Checkout flow presentation/demo style interface hai.
