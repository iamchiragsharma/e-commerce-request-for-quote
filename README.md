# ArtisanCorp Australia — Corporate Gifting & Quote Platform

An Australian corporate gifting e-commerce platform built with **React 19**, **TypeScript**, **Vite**, and **Vanilla CSS**. Designed with an Australian business focus, AUD pricing (ex. GST), and an intuitive quotation workflow.

---

## 🇦🇺 Australian Business Touchpoints

- **Pricing & Currency**: All items listed in Australian Dollars (`A$ / AUD`, ex GST). 10% Australian GST is calculated automatically upon quotation.
- **Brand Identity**: **ArtisanCorp Australia** (ABN: 48 619 824 105) based in North Sydney, NSW.
- **Australia-Wide Fulfillment**: Highlights express dispatch to Sydney, Melbourne, Brisbane, Perth, Adelaide, Hobart, Canberra, and Darwin.
- **Australian Local Sourcing**: Features Barossa Valley wine & cheese crates, Tasmanian Leatherwood honey, Byron Bay roasted coffee, and 100% Australian Merino wool corporate blankets.
- **Australian Corporate Inquiries**: Toll-free helpline `1300 782 438` and corporate inquiry support.

---

## 🧭 Navigation & Page Architecture

- **Top Announcement Bar**: Displays Australian ownership, nationwide dispatch, and AUD currency notice.
- **Header**:
  - **Left**: Corporate Logo (`ArtisanCorp AU`)
  - **Middle**:
    - `Home`: Clean executive hero banner, Australian trust badges, and popular corporate gifts.
    - `Executive Gifts`: Category 1 with 20 items (`EX-101` to `EX-120`).
    - `Employee Tech`: Category 2 with 20 items (`TC-201` to `TC-220`).
  - **Right**: Quote Icon + Quote Button displaying dynamic item badge counter.

### Core Pages

1. **Homepage (`#home`)**:
   - Executive intro banner with quick links to both corporate collections.
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

## 📱 Responsive Design Standards

- **Mobile (< 640px)**: Clean single-column stacked product cards, horizontally scrollable top navigation, touch-friendly steppers, and full-width forms.
- **Tablet (640px - 900px)**: 2-column product catalog and responsive quote layout.
- **Desktop (1024px+)**: 4-column product grid, 2-column product detail view, and split-screen quote review.
- **Balanced Controls**: Proportional button paddings and steppers with zero oversized elements.

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
