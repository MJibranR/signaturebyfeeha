# Signature by Feeha — Next.js

A pixel-faithful Next.js conversion of the Signature by Feeha fragrance e-commerce homepage.

## Project Structure

```
SignatureByFeeha/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main homepage
│   └── globals.css         # Tailwind base styles
├── components/
│   ├── AnnouncementBar.tsx # Top black banner
│   ├── Navbar.tsx          # Logo, search, nav links
│   └── HeroSection.tsx     # 6-in-1 composite hero grid
├── tailwind.config.ts
└── package.json
```

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Hero Grid Layout

The hero is a **6-panel composite** implemented as a CSS Grid:
- **Top Left**: SF Exclusives
- **Center** (spans 2 rows): Main hero with KAYALI bottles, delivery coupon, and scooter
- **Top Right**: KAYALI Featured Collections
- **Bottom Left**: French Avenue / Limited Editions
- **Bottom Right**: Maison Asrar / The Arabian Experience

## Notes on Images

Replace the gradient placeholders in `HeroSection.tsx` with your actual product images using Next.js `<Image />` components. The grid structure and overlays are fully built.

Add images to `/public/images/`:
- `sf-exclusives.jpg`
- `kayali-collection.jpg`
- `french-avenue.jpg`
- `maison-asrar.jpg`
- `hero-center.jpg`

