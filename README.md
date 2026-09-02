# ArtisanCorp — B2B Corporate Gifting & Request For Quote (RFQ) Demo

A clean, responsive corporate gifting e-commerce frontend built with **React 19**, **TypeScript**, **Vite**, and **Vanilla CSS**. Tailored specifically for client demonstrations showcasing an intuitive Request For Quote (RFQ) workflow.

---

## 🧭 Application Structure & Navigation

The navigation bar is kept clean and focused:
- **Left**: Corporate Brand Logo (`ArtisanCorp Gifts`)
- **Middle**:
  - `Home`: Simple homepage with an executive intro banner and demo product cards.
  - `Executive Gifts`: Category 1 featuring 20 luxury corporate gifts (leather valets, brass pens, wine crates, journals).
  - `Employee Tech`: Category 2 featuring 20 workplace tech essentials (ANC headphones, wireless chargers, USB hubs, webcams).
- **Right**: Quote Icon + Quote Button displaying a dynamic item badge counter.

---

## 🌟 Core Pages & Capabilities

### 1. Simple Homepage (`#home`)
- Clean intro hero banner highlighting corporate gifting and RFQ.
- Quick navigation shortcut cards to both categories.
- Featured showcase of corporate gift demo cards with image, SKU, category, regular price, and direct "Add to Quote" actions.

### 2. Category Pages (`#executive-gifts` & `#employee-tech`)
- Exactly **two demo categories** with **20 products in each** (40 products total).
- Each product card displays:
  - High-resolution product image
  - SKU code (e.g. `EX-101` to `EX-120`, `TC-201` to `TC-220`)
  - Product name & description
  - Regular price
  - Direct "+ Add to Quote" and "Details" buttons.
- Real-time search bar to quickly filter products by name or SKU.

### 3. Product Page (`#product/{id}`)
- Complete single product view with:
  - Product Image
  - SKU badge
  - Regular Price
  - Description
  - **Quantity increment / decrement buttons (`-` and `+`)**
  - **Add to Quote** button with instant visual confirmation
  - **Customer Reviews Section** with star ratings, comments, and an interactive "Write a Review" form.

### 4. Quote Page (`#quote`)
- Line-item review of all items added to the quote:
  - Product thumbnail, name, SKU, and category
  - Quantity controls (inc / dec / remove)
  - **Regular Price** (unit price and line total)
  - **Custom Target Price field**: Allows the client or buyer to enter a desired target price per unit.
  - **Input Note field**: Input field for custom branding notes, engraving instructions, or delivery requests.
  - **Summary**: Live aggregated unit count, Total Regular Price, and Total Custom Target Price.
  - **Request Quote button**: Triggers a clean demo submission popup with a generated RFQ reference number (e.g., `RFQ-849201`).
  - *(Email dispatch integration will be connected in the subsequent phase).*

---

## 📂 Project Directory Overview

```text
ecom-req-for-quote/
├── public/
├── src/
│   ├── types/
│   │   └── index.ts             # Clean TypeScript interfaces (Product, Category, QuoteItem)
│   ├── data/
│   │   └── mockData.ts          # 2 categories & 40 products (20 in each) with SKU & reviews
│   ├── context/
│   │   └── QuoteContext.tsx     # Global quote state (supports quantity, customPrice, note)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Logo (left), Home & Categories (middle), Quote button (right)
│   │   │   └── Footer.tsx       # Clean footer with quick links
│   │   ├── home/
│   │   │   └── SimpleHome.tsx   # Simple homepage with demo product cards
│   │   ├── category/
│   │   │   └── CategoryView.tsx # Category view with 20 items & instant search
│   │   ├── product/
│   │   │   └── ProductDetail.tsx# Product page with SKU, Price, inc/dec, Add to Quote, reviews
│   │   └── rfq/
│   │       └── RFQPage.tsx      # Quote page with Regular Price, Custom Price, Note & summary
│   ├── styles/
│   │   ├── variables.css        # Color tokens, typography, and spacing
│   │   └── main.css             # Vanilla CSS styles and responsive rules
│   ├── App.tsx                  # Main router and state coordination
│   ├── index.css                # Base reset and root styling
│   └── main.tsx                 # React DOM mount point
├── package.json
└── README.md
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# -> Opens on http://localhost:5173/

# Build for production
npm run build
```

---

## 🌿 Git Branches
- `dev`: Active development branch.
- `master`: Production branch.
