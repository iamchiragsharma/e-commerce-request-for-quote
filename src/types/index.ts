export interface TieredPrice {
  minQty: number;
  maxQty?: number;
  unitPrice: number;
}

export type CustomizationMethod = 
  | 'Laser Engraving' 
  | 'Silk Screen Printing' 
  | 'Embossing / Debossing' 
  | 'UV Color Print' 
  | 'Custom Sleeve / Packaging';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  categoryId: string;
  description: string;
  features: string[];
  basePrice: number;
  minOrderQty: number;
  leadTimeDays: number;
  tieredPricing: TieredPrice[];
  availableCustomizations: CustomizationMethod[];
  images: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  isEcoFriendly?: boolean;
  badge?: string;
  specs: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  image: string;
  iconName: string;
}

export interface SelectedCustomization {
  method: CustomizationMethod;
  notes?: string;
  logoPlacement?: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  customizations: SelectedCustomization[];
  customPackaging: boolean;
  notes?: string;
  estimatedUnitPrice: number;
}

export interface CompanyDetails {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  deliveryDate: string;
  shippingCountry: string;
  shippingCity: string;
  estimatedBudget?: string;
  additionalNotes?: string;
  hasLogoFile: boolean;
  logoFileName?: string;
}

export interface SubmittedQuote {
  rfqId: string;
  submittedAt: string;
  company: CompanyDetails;
  items: QuoteItem[];
  estimatedTotalUnits: number;
  estimatedTotalRange: {
    min: number;
    max: number;
  };
  status: 'Pending Review' | 'Estimating' | 'Quote Sent';
}

export type ActivePage = 'home' | 'categories' | 'product' | 'rfq';
