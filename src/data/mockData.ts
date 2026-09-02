import type { Category, Product } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-executive',
    name: 'Executive & VIP Sets',
    slug: 'executive-sets',
    description: 'Bespoke gifts crafted for C-suite leaders, board members, and high-value partnerships.',
    itemCount: 8,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    iconName: 'Crown'
  },
  {
    id: 'cat-tech',
    name: 'Premium Smart Tech',
    slug: 'tech-gadgets',
    description: 'High-performance workspace devices, noise-canceling audio, and wireless desk chargers.',
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    iconName: 'Cpu'
  },
  {
    id: 'cat-welcome',
    name: 'Employee Welcome Kits',
    slug: 'welcome-kits',
    description: 'Thoughtfully curated onboarding bundles designed to delight new hires on Day 1.',
    itemCount: 10,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    iconName: 'Gift'
  },
  {
    id: 'cat-drinkware',
    name: 'Artisan Drinkware',
    slug: 'drinkware',
    description: 'Double-wall vacuum insulated flasks, ceramic barista mugs, and copper tumblers.',
    itemCount: 9,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    iconName: 'Coffee'
  },
  {
    id: 'cat-eco',
    name: 'Eco & Sustainable',
    slug: 'sustainable-gifts',
    description: 'Certified recycled materials, organic cotton, and biodegradable office essentials.',
    itemCount: 7,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    iconName: 'Leaf'
  },
  {
    id: 'cat-hampers',
    name: 'Gourmet Gift Crates',
    slug: 'gourmet-hampers',
    description: 'Artisanal roasted coffees, Belgian truffles, and organic gourmet treats in wood crates.',
    itemCount: 6,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sparkles'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Apex Heritage Executive Desk Valet & Pen Set',
    tagline: 'Hand-stitched Italian leather organizer with weighted brass pen and Qi wireless dock',
    category: 'Executive & VIP Sets',
    categoryId: 'cat-executive',
    description: 'A statement piece for any executive workstation. Handcrafted from top-grain full leather with contrasting precision saddle stitching. Features an integrated 15W high-speed wireless charging cradle, hidden magnetic cable channels, and a monolithic brass ballpoint pen weighted to exact ergonomic balance.',
    features: [
      'Top-grain genuine Italian leather exterior',
      'Integrated fast Qi wireless charging pad (15W)',
      'Weighted solid brass pen with Schmidt rollerball cartridge',
      'Hidden cable management routing under suede base',
      'Complimentary debossed corporate monogramming'
    ],
    basePrice: 65,
    minOrderQty: 25,
    leadTimeDays: 7,
    tieredPricing: [
      { minQty: 25, maxQty: 49, unitPrice: 65 },
      { minQty: 50, maxQty: 99, unitPrice: 58 },
      { minQty: 100, maxQty: 249, unitPrice: 52 },
      { minQty: 250, maxQty: 499, unitPrice: 47 },
      { minQty: 500, unitPrice: 42 }
    ],
    availableCustomizations: ['Laser Engraving', 'Embossing / Debossing', 'Custom Sleeve / Packaging'],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585336261026-77884d59a59b?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isBestseller: true,
    badge: 'Executive Choice',
    specs: {
      'Material': 'Genuine Napa Leather & Brushed Brass',
      'Dimensions': '320mm x 210mm x 35mm',
      'Charging Output': 'Qi 15W Fast Charge (USB-C braided cable included)',
      'Branding Area': 'Laser Engraving on Pen (40x5mm) or Deboss on Leather (60x30mm)',
      'Packaging': 'Matte Black Rigid Magnetic Gift Box'
    }
  },
  {
    id: 'prod-2',
    name: 'SoundAura ANC Studio Wireless Headphones',
    tagline: 'Active noise cancelling wireless headphones with 45hr battery & anodized metal trims',
    category: 'Premium Smart Tech',
    categoryId: 'cat-tech',
    description: 'Designed for high-focus corporate professionals, the SoundAura ANC delivers studio-grade acoustics, hybrid active noise cancellation, and ultra-plush memory foam earcups. Custom laser-engrave your corporate emblem directly on the brushed aluminium exterior earcups.',
    features: [
      'Hybrid Active Noise Cancellation (-38dB reduction)',
      '45-Hour playback with rapid charge (10 min charge = 5 hours play)',
      'Precision CNC-machined aluminum earcups ideal for laser branding',
      'Multipoint Bluetooth 5.3 connection for laptop and smartphone pairing',
      'Includes ballistic nylon hard-shell travel case with custom printed zipper pull'
    ],
    basePrice: 89,
    minOrderQty: 25,
    leadTimeDays: 10,
    tieredPricing: [
      { minQty: 25, maxQty: 49, unitPrice: 89 },
      { minQty: 50, maxQty: 99, unitPrice: 79 },
      { minQty: 100, maxQty: 249, unitPrice: 72 },
      { minQty: 250, unitPrice: 65 }
    ],
    availableCustomizations: ['Laser Engraving', 'UV Color Print', 'Custom Sleeve / Packaging'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isBestseller: true,
    badge: 'Top Tech Gift',
    specs: {
      'Audio Driver': '40mm Titanium Composite Dynamic Drivers',
      'Battery Life': '45 Hours ANC off / 35 Hours ANC on',
      'Weight': '248g ergonomic lightweight build',
      'Branding Method': 'Laser etch or UV Color imprint on earcap outer disc',
      'Standard Packaging': 'Rigid presentation box with molded foam insert'
    }
  },
  {
    id: 'prod-3',
    name: 'Day-One Velocity Employee Onboarding Kit',
    tagline: 'Complete 5-piece onboarding bundle with custom debossed notebook, tumbler, & hoodie',
    category: 'Employee Welcome Kits',
    categoryId: 'cat-welcome',
    description: 'The ultimate welcoming gesture for high-growth tech teams and corporate new hires. Includes a linen hardcover planner notebook, matte powder-coated thermal tumbler, heavy organic cotton corporate hoodie, metallic stylus pen, and custom welcome note envelope.',
    features: [
      '5 curated daily essentials in harmonized company brand colors',
      'Thermal 500ml tumbler keeps beverages warm for 12 hours',
      '192-page FSC-certified fountain-pen friendly bound notebook',
      'Custom full-color welcome card with leadership welcome message',
      'Shipped in custom company-branded mailer box'
    ],
    basePrice: 55,
    minOrderQty: 30,
    leadTimeDays: 8,
    tieredPricing: [
      { minQty: 30, maxQty: 59, unitPrice: 55 },
      { minQty: 60, maxQty: 149, unitPrice: 48 },
      { minQty: 150, maxQty: 299, unitPrice: 43 },
      { minQty: 300, unitPrice: 38 }
    ],
    availableCustomizations: ['Laser Engraving', 'Silk Screen Printing', 'Embossing / Debossing', 'Custom Sleeve / Packaging'],
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    badge: 'Popular for HR',
    specs: {
      'Included Items': 'Linen Journal, 500ml Tumbler, Pen, Lapel Pin, Custom Mailer Box',
      'Colors': 'Custom matched to corporate brand hex palette',
      'Kitting': 'Pre-assembled and individually sealed ready for employee drop-shipping',
      'Branding': 'Multi-location branding across all components'
    }
  },
  {
    id: 'prod-4',
    name: 'Nordic Ember Smart Copper Thermal Mug & Coaster',
    tagline: 'Temperature maintaining smart desktop coaster with brushed ceramic tumbler',
    category: 'Artisan Drinkware',
    categoryId: 'cat-drinkware',
    description: 'Keep coffee, tea, or artisan brew at the precise ideal temperature (135°F / 57°C) all workday long. Features an intelligent induction heater coaster that doubles as a phone charger, paired with a scratch-resistant matte ceramic vessel.',
    features: [
      'Dual-purpose base: Mug temperature keeper + 10W smartphone charger',
      'Ergonomic balance with cool-touch handle',
      'Auto shut-off sensor when mug is removed',
      'Laser-engraved corporate logo on coaster and mug flank'
    ],
    basePrice: 42,
    minOrderQty: 25,
    leadTimeDays: 6,
    tieredPricing: [
      { minQty: 25, maxQty: 49, unitPrice: 42 },
      { minQty: 50, maxQty: 99, unitPrice: 37 },
      { minQty: 100, maxQty: 249, unitPrice: 33 },
      { minQty: 250, unitPrice: 29 }
    ],
    availableCustomizations: ['Laser Engraving', 'Silk Screen Printing', 'Custom Sleeve / Packaging'],
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isBestseller: true,
    badge: 'Best Value',
    specs: {
      'Capacity': '380ml / 13oz',
      'Power Source': 'Type-C USB power cable (included)',
      'Base Function': 'Microgravity sensor heating + Qi phone charge',
      'Certifications': 'FCC, CE, RoHS compliant'
    }
  },
  {
    id: 'prod-5',
    name: 'Terra Recycled Ocean Bound Tech Folio',
    tagline: '100% GRS certified recycled ocean plastic organizer with magnetic tablet sleeve',
    category: 'Eco & Sustainable',
    categoryId: 'cat-eco',
    description: 'Showcase your company’s environmental stewardship. Crafted from 14 post-consumer recycled plastic bottles rescued from coastlines. Water-repellent textured weave protects laptops up to 16", cables, power banks, and cards.',
    features: [
      'Each folio removes equivalent of 14 plastic bottles from coastal waterways',
      'Padded shock-absorbing sleeve fits up to MacBook Pro 16"',
      'Eco-leather pull tabs and non-toxic water-based weather coating',
      'Includes impact report card inside the pocket showing carbon savings'
    ],
    basePrice: 39,
    minOrderQty: 40,
    leadTimeDays: 8,
    tieredPricing: [
      { minQty: 40, maxQty: 79, unitPrice: 39 },
      { minQty: 80, maxQty: 199, unitPrice: 34 },
      { minQty: 200, maxQty: 499, unitPrice: 30 },
      { minQty: 500, unitPrice: 26 }
    ],
    availableCustomizations: ['Laser Engraving', 'Silk Screen Printing', 'Custom Sleeve / Packaging'],
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isEcoFriendly: true,
    badge: '100% Eco Certified',
    specs: {
      'Fabric': '600D RPET Post-Consumer Recycled Polyester',
      'Compatibility': 'Universal up to 16" laptops & tablets',
      'Impact': 'Saves 2.4kg of CO2 equivalent per unit',
      'Branding': 'Silk screen or recycled woven label patch'
    }
  },
  {
    id: 'prod-6',
    name: 'Sommelier Reserve Truffle & Roast Gift Crate',
    tagline: 'Artisanal single-origin dark chocolates, rare reserve coffee, and handcrafted wooden crate',
    category: 'Gourmet Gift Crates',
    categoryId: 'cat-hampers',
    description: 'An indulgent, sensory gift experience for holiday client appreciation or celebrating major deal milestones. Presented in a fire-branded pine wood crate with brass latches.',
    features: [
      'Small-batch single origin Ecuadorian 72% dark chocolate bonbons',
      'Artisanal whole bean Colombian Gesha reserve roast (250g)',
      'Raw organic wild mountain blossom honey with olive wood dipper',
      'Fire-branded corporate logo on crate pine lid'
    ],
    basePrice: 75,
    minOrderQty: 20,
    leadTimeDays: 5,
    tieredPricing: [
      { minQty: 20, maxQty: 49, unitPrice: 75 },
      { minQty: 50, maxQty: 99, unitPrice: 68 },
      { minQty: 100, maxQty: 249, unitPrice: 62 },
      { minQty: 250, unitPrice: 56 }
    ],
    availableCustomizations: ['Laser Engraving', 'Custom Sleeve / Packaging'],
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: false,
    badge: 'Gourmet Milestone',
    specs: {
      'Shelf Life': '10 Months sealed storage',
      'Packaging': 'Solid natural kiln-dried pine crate with brass clasp',
      'Branding': 'Direct laser engraving or heat-branded lid logo'
    }
  },
  {
    id: 'prod-7',
    name: 'Horizon 20,000mAh Magnetic Power Station',
    tagline: 'MagSafe compatible ultra-slim aluminum portable battery with fast laptop charging',
    category: 'Premium Smart Tech',
    categoryId: 'cat-tech',
    description: 'High capacity 65W Power Delivery laptop and phone power station. Thin aircraft-grade sandblasted aluminum chassis with precision beveled edges. Keep executives powered up during international flights and offsite conferences.',
    features: [
      '65W USB-C PD output can fully recharge a MacBook Pro 14"',
      'Dual magnetic wireless snap-charging coils for phone and watch',
      'Digital LED percentage readout concealed behind mirrored glass',
      'FAA airline-approved safe carry-on capacity'
    ],
    basePrice: 58,
    minOrderQty: 30,
    leadTimeDays: 7,
    tieredPricing: [
      { minQty: 30, maxQty: 59, unitPrice: 58 },
      { minQty: 60, maxQty: 149, unitPrice: 51 },
      { minQty: 150, maxQty: 299, unitPrice: 46 },
      { minQty: 300, unitPrice: 41 }
    ],
    availableCustomizations: ['Laser Engraving', 'UV Color Print', 'Custom Sleeve / Packaging'],
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585336261026-77884d59a59b?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: false,
    badge: 'B2B Essential',
    specs: {
      'Capacity': '20,000mAh / 74Wh Airline Safe',
      'Outputs': '2x USB-C (65W max), 1x USB-A (22.5W QC 3.0)',
      'Dimensions': '145mm x 72mm x 18mm, 340g'
    }
  },
  {
    id: 'prod-8',
    name: 'Veritas Eco Bamboo & Steel Vacuum Growler',
    tagline: 'Sustainable thermal beverage carafe with FSC bamboo lid and copper lining',
    category: 'Eco & Sustainable',
    categoryId: 'cat-eco',
    description: 'Double-walled vacuum insulated flask with a natural laser-engraved bamboo cap. Tested to keep ice cold for 36 hours and drinks piping hot for 18 hours without condensation or temperature transfer.',
    features: [
      '304 food-grade stainless steel inside and outside',
      '100% natural FSC-certified bamboo accent cap with silicone leakproof ring',
      'BPA-free, non-leaching, and zero metallic aftertaste',
      'Supplied in unbleached recycled kraft cylinder gift box'
    ],
    basePrice: 28,
    minOrderQty: 50,
    leadTimeDays: 6,
    tieredPricing: [
      { minQty: 50, maxQty: 99, unitPrice: 28 },
      { minQty: 100, maxQty: 249, unitPrice: 24 },
      { minQty: 250, maxQty: 499, unitPrice: 21 },
      { minQty: 500, unitPrice: 18 }
    ],
    availableCustomizations: ['Laser Engraving', 'Silk Screen Printing', 'Custom Sleeve / Packaging'],
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: false,
    isEcoFriendly: true,
    badge: 'Eco Favorite',
    specs: {
      'Volume': '750ml / 25oz',
      'Lid': 'Natural untreated bamboo with laser imprint',
      'Insulation': 'Triple-layer vacuum with copper thermal barrier'
    }
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Curate Your Gift Catalog',
    desc: 'Browse premium corporate gifts, select item quantities, and specify custom branding methods like laser etching or logo debossing.'
  },
  {
    step: '02',
    title: 'Submit Instant RFQ',
    desc: 'Fill out your company timeline, upload corporate vector artwork, and submit your RFQ basket with zero upfront payment required.'
  },
  {
    step: '03',
    title: 'Receive Digital Proof & Quote',
    desc: 'Our dedicated enterprise gifting specialist prepares a formal PDF quotation with volume price tiers and 3D digital mockup within 24 hours.'
  },
  {
    step: '04',
    title: 'White-Glove Fulfillment',
    desc: 'Upon quote approval, we manage precision mass production, custom packaging, and individual doorstep fulfillment worldwide.'
  }
];

export const VALUE_PROPS = [
  {
    title: 'Low Minimum Order Quantities',
    desc: 'Start corporate orders from just 20-30 units, ideal for small executive teams as well as 10,000+ attendee conferences.',
    icon: 'Layers'
  },
  {
    title: 'Complimentary Digital Mockups',
    desc: 'Our in-house design team prepares free 3D virtual proof simulations with your logo prior to invoice confirmation.',
    icon: 'CheckCircle'
  },
  {
    title: 'Rapid 5-10 Day Turnaround',
    desc: 'Speed matters. Access expedited production and priority courier dispatch for upcoming corporate events and summits.',
    icon: 'Zap'
  },
  {
    title: 'Global Direct-to-Desk Shipping',
    desc: 'Send customized gifts directly to remote team members across 85+ countries with tracked customs clearance.',
    icon: 'Globe'
  }
];

export const CLIENT_LOGOS = [
  'Nexis Cloud', 'Vanguard Fintech', 'Quantum Capital', 'Hyperion Dynamics', 'Aura Therapeutics', 'Beacon Labs'
];

export const TESTIMONIALS = [
  {
    quote: "The RFQ turnaround was blisteringly fast. Within 18 hours we had tiered pricing and gorgeous 3D proofs of our branded executive desk valets for our annual summit.",
    author: "Elena Rostova",
    role: "VP of People Operations",
    company: "Hyperion Dynamics"
  },
  {
    quote: "Onboarding 250 remote engineers across Europe and North America felt effortless. Every new hire received their personalized welcome kit on Day 1 without a hitch.",
    author: "Marcus Vance",
    role: "Chief Marketing Officer",
    company: "Nexis Cloud"
  },
  {
    quote: "The product quality exceeded expectations. The laser-etched ANC headphones felt like a luxury consumer retail purchase rather than typical corporate swag.",
    author: "Sarah Chen",
    role: "Director of Enterprise Relations",
    company: "Vanguard Global"
  }
];
