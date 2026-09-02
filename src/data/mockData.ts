import type { Category, Product } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-executive',
    name: 'Executive Gifts',
    slug: 'executive-gifts',
    description: 'Bespoke executive gift sets, genuine leather accessories, Australian wine hampers, and distinguished recognition pieces.'
  },
  {
    id: 'cat-tech',
    name: 'Employee Tech',
    slug: 'employee-tech',
    description: 'High-performance workspace devices, wireless desk chargers, ANC headphones, and ergonomic accessories.'
  }
];

const sampleReviews = [
  { id: 'r1', author: 'Lachlan Murdoch', rating: 5, comment: 'Exceptional build quality. Ordered 80 units for our Sydney annual leadership summit.', date: 'Sydney, NSW' },
  { id: 'r2', author: 'Chloe Thornton', rating: 5, comment: 'Laser logo engraving was flawless. Fast delivery to our Melbourne office within 3 business days.', date: 'Melbourne, VIC' },
  { id: 'r3', author: 'Hamish Campbell', rating: 4, comment: 'High quality corporate gift choice. Packaged beautifully and our Brisbane clients loved it.', date: 'Brisbane, QLD' }
];

export const PRODUCTS: Product[] = [
  // ================= 20 EXECUTIVE GIFTS (Australian Touches) =================
  {
    id: 'prod-ex-1',
    name: 'Apex Heritage Executive Desk Valet',
    sku: 'EX-101',
    price: 65,
    description: 'Handcrafted top-grain leather desk organizer with solid brass pen holder and magnetic catchall tray.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-2',
    name: 'Monolith Solid Brass Rollerball Pen',
    sku: 'EX-102',
    price: 38,
    description: 'Weighted solid brass chassis with precision German Schmidt ceramic rollerball refill and keepsake case.',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-3',
    name: 'Nordic Ember Double Wall Copper Tumbler',
    sku: 'EX-103',
    price: 32,
    description: '16oz vacuum insulated tumbler with brushed copper lining and spill-resistant splash lid.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-4',
    name: 'Barossa Reserve Artisan Wine & Cheese Crate',
    sku: 'EX-104',
    price: 88,
    description: 'Artisanal cheese knives, native timber cutting board, and vacuum wine preserver in a branded Australian pine crate.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-5',
    name: 'Australian Merino Wool Executive Travel Throw',
    sku: 'EX-105',
    price: 95,
    description: '100% pure Australian superfine merino wool blanket with fringed hems and custom debossed leather strap.',
    image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-6',
    name: 'Kensington Hardcover Linen Journal Set',
    sku: 'EX-106',
    price: 26,
    description: '192-page 100gsm acid-free FSC paper journal bound in woven linen with metallic foil edges.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-7',
    name: 'Veritas Eco Bamboo Vacuum Growler Flask',
    sku: 'EX-107',
    price: 29,
    description: '750ml double-wall stainless steel flask wrapped in sustainable natural bamboo with laser-engraved lid.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-8',
    name: 'Savile Genuine Leather Document Portfolio',
    sku: 'EX-108',
    price: 78,
    description: 'Full-zip zippered document folio with notebook sleeve, tablet pocket, and business card slots.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-9',
    name: 'Titanium Matte RFID Business Card Case',
    sku: 'EX-109',
    price: 22,
    description: 'Ultra-slim aerospace titanium card holder with spring-loaded thumb dispensing slot.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-10',
    name: 'Tasmanian Leatherwood Honey & Truffle Hamper',
    sku: 'EX-110',
    price: 72,
    description: 'Pure certified organic Tasmanian Leatherwood honey, artisan dark chocolates, and olive wood dipper.',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-11',
    name: 'Byron Bay Micro-Lot Specialty Coffee Trio',
    sku: 'EX-111',
    price: 48,
    description: 'Three 200g bags of artisan roasted single-origin coffees in an Australian botanical gift cylinder.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-12',
    name: 'Regal Crystal Decanter & Rocks Glasses Set',
    sku: 'EX-112',
    price: 98,
    description: 'Lead-free European crystal decanter with two matching weighted rocks glasses for executive gifting.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-13',
    name: 'Chrono Carrara & Walnut Desktop Clock',
    sku: 'EX-113',
    price: 49,
    description: 'Minimalist silent sweep desktop timepiece combining natural white marble and solid timber accents.',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-14',
    name: 'Australian Lemon Myrtle & Cedar Soy Candle',
    sku: 'EX-114',
    price: 34,
    description: 'Hand-poured pure soy wax candle featuring native Australian lemon myrtle and blue gum essential oils.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-15',
    name: 'Heritage Ceramic Hand-Glazed Brewer Set',
    sku: 'EX-115',
    price: 44,
    description: 'Artisan hand-glazed matte ceramic pour-over dripper and server carafe for boardroom coffee rituals.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-16',
    name: 'Signature Stainless Steel Golf Divot & Ball Marker',
    sku: 'EX-116',
    price: 25,
    description: 'Laser-engraved 3-in-1 golf accessory set with magnetic ball marker in a velvet gift tin.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-17',
    name: 'AeroCarbon Minimalist RFID Bifold Wallet',
    sku: 'EX-117',
    price: 45,
    description: 'Real 3K carbon fiber and genuine Napa leather bifold wallet with certified RFID protection.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-18',
    name: 'Vanguard Polished Beveled Acrylic Plaque',
    sku: 'EX-118',
    price: 58,
    description: '1-inch thick beveled edge acrylic desktop recognition award with custom high-resolution UV print.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-19',
    name: 'Oxford Bridle Leather Lanyard & Key Fob',
    sku: 'EX-119',
    price: 19,
    description: 'Australian bridle leather strap with gunmetal quick-release carabiner clasp and debossed initials.',
    image: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },
  {
    id: 'prod-ex-20',
    name: 'Executive Leather Coaster Set with Timber Base',
    sku: 'EX-120',
    price: 36,
    description: 'Set of 6 debossed circular leather coasters with water-resistant treatment and Tasmanian oak stand.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-executive',
    categoryName: 'Executive Gifts',
    reviews: sampleReviews
  },

  // ================= 20 EMPLOYEE TECH =================
  {
    id: 'prod-tc-1',
    name: 'SoundAura ANC Studio Wireless Headphones',
    sku: 'TC-201',
    price: 89,
    description: 'Hybrid active noise-canceling headphones with 45-hour battery life and aluminum logo earplates.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-2',
    name: 'Horizon 15W Qi Fast Wireless Charging Mat',
    sku: 'TC-202',
    price: 28,
    description: 'Fabric-wrapped desktop charging pad compatible with all Qi-enabled phones and wireless earbuds.',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-3',
    name: 'VoltStream 20,000mAh Laptop Power Bank',
    sku: 'TC-203',
    price: 58,
    description: '65W USB-C Power Delivery external battery pack capable of rapidly recharging laptops and phones.',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-4',
    name: 'PulseTrack Smart Health & Activity Band',
    sku: 'TC-204',
    price: 45,
    description: 'Slim fitness band with heart rate tracking, sleep monitor, and step counter in a water-resistant band.',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-5',
    name: 'CrystalSound 360 Portable Bluetooth Speaker',
    sku: 'TC-205',
    price: 39,
    description: 'Waterproof IPX7 wireless speaker with 12 hours of playtime and rich room-filling 360 acoustics.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-6',
    name: 'Lumina 1080p FHD Wide-Angle Webcam',
    sku: 'TC-206',
    price: 42,
    description: 'High-definition video conferencing camera with dual noise-reduction microphones and privacy shutter.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-7',
    name: 'AlumaStand Ergonomic Aluminum Laptop Riser',
    sku: 'TC-207',
    price: 34,
    description: 'Foldable aircraft-grade aluminum stand that raises laptops to ergonomic eye level for better posture.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-8',
    name: 'GlidePro Ergonomic Wireless Vertical Mouse',
    sku: 'TC-208',
    price: 29,
    description: 'Natural handshake position ergonomic mouse that reduces wrist strain during prolonged desk work.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-9',
    name: 'HydroCharge Temperature Control Smart Coaster',
    sku: 'TC-209',
    price: 38,
    description: 'Maintains coffee at ideal sipping temperature while also functioning as a 10W phone charger.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-10',
    name: 'AirPods Leather Protective Armor Case',
    sku: 'TC-210',
    price: 18,
    description: 'Hand-molded leather cover with wireless charging pass-through and a rugged zinc alloy belt clip.',
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-11',
    name: 'MultiPort 7-in-1 Aluminum USB-C Hub',
    sku: 'TC-211',
    price: 36,
    description: 'Expands one USB-C port to 4K HDMI, 3x USB 3.0, SD card reader, and 100W Power Delivery charging.',
    image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-12',
    name: 'VividGlow USB Monitor Light Bar',
    sku: 'TC-212',
    price: 46,
    description: 'Screen-mounted task lamp with asymmetrical optical design that illuminates the desk with zero screen glare.',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-13',
    name: 'MagSnap 3-in-1 Foldable Travel Charger',
    sku: 'TC-213',
    price: 48,
    description: 'MagSafe compatible folding stand that simultaneously powers an iPhone, Apple Watch, and wireless earbuds.',
    image: 'https://images.unsplash.com/photo-1585336261026-77884d59a59b?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-14',
    name: 'AeroTrack Bluetooth Key & Luggage Finder',
    sku: 'TC-214',
    price: 24,
    description: 'Ultra-thin Bluetooth tracker with 2-way alarm function and replaceable coin-cell battery.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-15',
    name: 'StealthPro Felt & Leather Extended Desk Mat',
    sku: 'TC-215',
    price: 27,
    description: '900x400mm waterproof desk pad providing a smooth mouse glide and protection for office surfaces.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-16',
    name: 'OmniCord 4-in-1 Universal Fast Cable',
    sku: 'TC-216',
    price: 16,
    description: 'Braided nylon heavy-duty charging cable with interchangeable USB-C, Lightning, and Micro-USB tips.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-17',
    name: 'NoiseShield Desktop Acoustic Microphone',
    sku: 'TC-217',
    price: 54,
    description: 'Cardioid condenser USB microphone with built-in pop filter and mute tap button for clear video meetings.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-18',
    name: 'CyberClean UV-C Phone & Key Sanitizer Box',
    sku: 'TC-218',
    price: 35,
    description: 'Dual UV-C germicidal light chamber that cleans phones, glasses, and office keys in just 3 minutes.',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-19',
    name: 'TechFolio Shockproof Cable Organizer Case',
    sku: 'TC-219',
    price: 22,
    description: 'Waterproof double-layer travel pouch with elastic loops and mesh zippered slots for cables and chargers.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  },
  {
    id: 'prod-tc-20',
    name: 'SmartTouch Digital Stylus Pen for Tablets',
    sku: 'TC-220',
    price: 32,
    description: 'Pixel-perfect active stylus pen with palm rejection technology and fast magnetic USB-C charging.',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=600&q=80',
    categoryId: 'cat-tech',
    categoryName: 'Employee Tech',
    reviews: sampleReviews
  }
];
