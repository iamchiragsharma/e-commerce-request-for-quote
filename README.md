# ArtisanCorp — B2B Corporate Gifts & Request For Quote (RFQ) Platform

An enterprise-grade B2B corporate gifting e-commerce web application built with **React 19**, **TypeScript**, **Vite**, and a bespoke **Vanilla CSS Design System**. The platform is specifically designed around the **Request For Quote (RFQ)** procurement model, allowing corporate buyers to curate gift sets, configure branding specifications, view live volume tiered pricing, and submit quotes without upfront payment.

---

## 🌟 Key Pages & Features

### 1. Homepage (`#home`)
- **Executive Hero Section**: High-impact corporate headline, key trust statistics (500+ enterprise clients, 24h turnaround, 99.4% on-time delivery), and quick-action buttons.
- **Value Propositions**: Four corporate pillars (Low MOQ starting at 20-30 units, complimentary 3D virtual proofs, 5-10 day turnaround, and global direct-to-desk shipping).
- **Curated Category Grid**: Visual navigation across key corporate departments: Executive VIP Sets, Premium Smart Tech, Welcome Kits, Artisan Drinkware, Eco & Sustainable Gifts, and Gourmet Crates.
- **Featured Corporate Gifts**: Bestselling gift sets with live volume starting tiers, quick "Add to Quote", and specification links.
- **How RFQ Works Infographic**: 4-step workflow explaining the procurement journey from curation to doorstep white-glove fulfillment.
- **Enterprise Social Proof**: Verified client testimonials and corporate client logo strip.

### 2. Category Catalog Page (`#categories` / `#category/{id}`)
- **Multi-Level Filtering**:
  - Category pill tabs with dynamic product count badges.
  - Real-time search bar across product titles, taglines, and customization techniques.
  - Eco-Friendly & Sustainable quick toggle (`🌱`).
  - Fast Turnaround quick filter (`⚡ ≤ 7 Days`).
  - Sort by: Featured/Bestsellers, Price (Low to High), Price (High to Low), and Lowest MOQ.
- **Responsive Product Grid**: Badged product cards displaying minimum order quantities (MOQ), tiered bulk rates, and direct quote basket actions.

### 3. Product Detail Page (`#product/{id}`)
- **Interactive Media Gallery**: High-resolution photography with interactive thumbnail switching.
- **Dynamic Tiered Volume Pricing Matrix**:
  - Live highlight of the active pricing tier corresponding to the chosen order quantity.
  - Direct clickable tier boxes that automatically update quantity.
- **Custom Branding Configurator**:
  - Branding methods (Laser Engraving, Silk Screen Printing, Embossing / Debossing, UV Color Print).
  - Logo placement selector (Front Center, Subdued Corner, Laser Barrel, Gift Box Lid).
  - Optional luxury magnetic gift box and foil ribbon packaging (+ $3.50/unit).
  - Custom Pantone PMS color code and instructions field.
- **Quantity Stepper with MOQ Protection**: Enforces minimum order quantity restrictions with live savings calculation.
- **Technical Specifications Table**: Detailed breakdown of dimensions, materials, lead times, and certifications.

### 4. Request For Quote (RFQ) Page (`#rfq`)
- **Itemized Quote Basket**:
  - Line-item summary displaying product thumbnail, selected branding methods, and packaging choices.
  - Quantity adjuster that dynamically recalculates tiered unit pricing.
  - Real-time aggregated unit count and estimated budget range.
- **Corporate Inquiry Form**:
  - Required fields: Company Name, Contact Person, Corporate Email, Phone Number, and Destination City.
  - Target event/delivery date picker.
  - Estimated gifting budget range selector.
  - Vector logo upload simulator (`.AI`, `.EPS`, `.SVG`, `.PNG`) for 3D proof preparation.
  - Special instructions and fulfillment notes.
- **Instant Quotation Confirmation Screen**:
  - Unique generated RFQ Reference ID (e.g., `RFQ-2026-849210`).
  - Itemized request summary and destination breakdown.
  - "Print / Save RFQ Receipt" button.

---

## 🏗️ Architecture & Directory Structure

```text
ecom-req-for-quote/
├── public/                      # Static web assets and favicons
├── src/
│   ├── types/
│   │   └── index.ts             # Domain models (Product, Category, QuoteItem, SubmittedQuote)
│   ├── data/
│   │   └── mockData.ts          # Curated B2B gift items, categories, pricing tables, reviews
│   ├── context/
│   │   └── QuoteContext.tsx     # Global RFQ basket state with localStorage persistence
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Sticky navigation, brand logo, and active RFQ counter badge
│   │   │   └── Footer.tsx       # Corporate compliance, direct helpline, and quick links
│   │   ├── home/
│   │   │   ├── HeroSection.tsx  # Executive hero with featured highlight card
│   │   │   ├── ValueProps.tsx   # Trust metrics (MOQ, 3D proofs, rapid lead times)
│   │   │   ├── CategoryGrid.tsx # Category visual cards with category navigation
│   │   │   ├── FeaturedGifts.tsx# Bestseller corporate packages
│   │   │   ├── HowItWorks.tsx   # 4-step RFQ process walkthrough
│   │   │   └── Testimonials.tsx # Enterprise client reviews and brand logos
│   │   ├── category/
│   │   │   └── CategoryView.tsx # Filterable catalog with search, sort, and eco filters
│   │   ├── product/
│   │   │   └── ProductDetail.tsx# Tiered volume table, branding configurator, specs
│   │   └── rfq/
│   │       ├── RFQPage.tsx      # RFQ basket management and corporate inquiry form
│   │       └── QuoteConfirmation.tsx # Generated RFQ reference number and receipt
│   ├── styles/
│   │   ├── variables.css        # Design tokens: corporate navy/indigo, elevations, radiuses
│   │   └── main.css             # Vanilla CSS design system, responsive layouts, components
│   ├── App.tsx                  # Root component with URL hash routing and page view state
│   ├── index.css                # Base stylesheet importing design tokens
│   └── main.tsx                 # React DOM root entry point
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.json                # TypeScript root configuration
├── tsconfig.app.json            # Application TypeScript configuration
├── vite.config.ts               # Vite bundler configuration
└── README.md                    # Project documentation and engineering guide
```

---

## 🔄 State Management & RFQ Workflow

The application uses **React Context API** (`src/context/QuoteContext.tsx`) for global state management:

1. **Automatic Persistence**: All items added to the Quote Basket are stored in `localStorage` under `corporate_rfq_basket_v1`.
2. **Dynamic Volume Pricing**: When an item's quantity changes, the `calculateUnitPrice()` function inspects the product's `tieredPricing` schedule:
   ```ts
   // Example: SoundAura ANC Headphones
   25 - 49 units  -> $89 / unit
   50 - 99 units  -> $79 / unit
   100 - 249 units -> $72 / unit
   250+ units     -> $65 / unit
   ```
3. **RFQ Submission**: Submitting the form generates a formal reference number (`RFQ-YYYY-XXXXXX`), snapshots the order, stores it in `corporate_rfq_last_submission_v1`, clears the active basket, and presents the confirmation screen.

---

## 🧭 Client-Side URL Routing

URL hash routing is built without extra bloated router libraries:
- `#home`: Main landing page
- `#categories`: All collections catalog
- `#category/{id}`: Filtered catalog for a specific category
- `#product/{id}`: Detailed view for a specific product
- `#rfq`: Request For Quote basket and submission form

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18 or higher (tested on Node v26)
- **npm**: v9 or higher

### Installation & Execution

```bash
# 1. Install dependencies
npm install

# 2. Start Vite local development server
npm run dev
# -> Server will run at http://localhost:5173/

# 3. Type-check and build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🌿 Git Workflow & Branches

The repository follows a clean branch strategy:
- `dev`: Active development branch where new features, components, and enhancements are committed.
- `master`: Production-ready release branch merged from `dev`.

```bash
# Switch to dev branch
git checkout dev

# Stage and commit your changes
git add .
git commit -m "feat: add your feature description"

# Push to origin dev
git push origin dev

# Merge into master for release
git checkout master
git merge dev
git push origin master
git checkout dev
```

---

## 🤝 Code Standards & Style
- **TypeScript**: Strict type checks with explicit type-only imports (`import type { ... }`) for `verbatimModuleSyntax` compatibility.
- **CSS Architecture**: Organized in `src/styles/variables.css` and `src/styles/main.css`. Uses semantic classes and CSS custom properties instead of hardcoded hex values.
- **Accessibility & UX**: Clear headings hierarchy, semantic HTML elements, interactive focus states, and responsive layouts across mobile, tablet, and desktop viewports.
