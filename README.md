# ArtisanCorp Australia — Corporate Gifting & Quote Platform

An Australian corporate gifting e-commerce platform built with **React 19**, **TypeScript**, **Vite**, and **Vanilla CSS**. Designed with an Australian business focus, AUD pricing (ex. GST), full mobile responsiveness, and an intuitive quotation workflow.

---

## 🇦🇺 Australian Business & Design Features

- **Top Green Bar with Smooth Infinite Ticker**: Slow, continuous marquee ticker highlighting Australian ownership, express capital city dispatch, and toll-free helpline (`1300 782 438`).
- **Mobile Navigation**:
  - **Left**: Hamburger menu button (`☰`) opening a slide-in navigation drawer.
  - **Middle**: Brand Logo (`ArtisanCorp AU`).
  - **Right**: Simple Quote icon with dynamic badge counter.
- **Desktop Navigation**: Classic clean layout with left logo, centered nav links, and right quote button.
- **Pricing & Currency**: All items listed in Australian Dollars (`A$ / AUD`, ex GST). 10% Australian GST is calculated automatically upon quotation.
- **Brand Identity**: **ArtisanCorp Australia** (ABN: 48 619 824 105) based in North Sydney, NSW.
- **Australia-Wide Fulfillment**: Highlights express dispatch to Sydney, Melbourne, Brisbane, Perth, Adelaide, Hobart, Canberra, and Darwin.
- **Australian Local Range**: Barossa Valley wine & cheese crates, Tasmanian Leatherwood honey, Byron Bay roasted coffee, and 100% Australian Merino wool throws.

---

## 🧭 Navigation & Page Architecture

### Core Pages

1. **Homepage (`#home`)**:
   - Clean executive intro banner with quick links to both corporate collections.
   - Australian trust badges (Australian Owned, Fast Dispatch, Precision Branding, Carbon Neutral).
   - Curated corporate gift cards with image, SKU, category, regular price (AUD), and direct "+ Add to Quote" button.

2. **Category Pages (`#executive-gifts` & `#employee-tech`)**:
   - 20 products per category (40 items total).
   - Real-time instant search by name or SKU.
   - Consistent product cards with image, SKU, category tag, regular price, and quote actions.

3. **Product Page (`#product/{id}`)**:
   - High-res product image and Australian delivery notice.
   - SKU, Regular Price (AUD, ex GST), and Description.
   - Proportional quantity increment / decrement buttons (`-` / `+`).
   - Add to Quote button with instant confirmation.
   - Client Reviews section featuring ratings, feedback from Sydney/Melbourne/Brisbane clients, and a review form.

4. **Quote Page (`#quote`)**:
   - Line-item summary displaying product image, title, SKU, and quantity steppers.
   - **Regular Price** in AUD.
   - **Custom Target Price field**: Allows the client or buyer to enter a desired custom target price per unit.
   - **Input Note field**: Allows specific customization instructions, logo engraving notes, or event deadlines.
   - Detailed quotation summary with regular subtotal, estimated 10% GST, and total with GST.
   - Corporate submission form with Australian delivery state selector and confirmation modal.

---

## 📱 Mobile-First Responsive Standards

- **Mobile Viewports (< 640px)**:
  - Header displays Hamburger on the left, Logo centered, and Quote icon on the right.
  - Slide-in drawer for quick navigation with smooth touch backdrop.
  - Infinite smooth ticker scroll across the top announcement bar without stutter.
  - Product cards stack cleanly with vertical button layout to prevent text clipping.
  - Quote items stack cleanly into image header, stepper row, and full-width input fields.
- **Tablet (640px – 860px)**: Fluid 2-column catalog grid with balanced margins.
- **Desktop (1024px+)**: Full 4-column product grid and split quotation workbench.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
# -> Runs on http://localhost:5173/

# 3. Build for production
npm run build
```
