export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  description: string;
  image: string;
  categoryId: 'cat-executive' | 'cat-tech';
  categoryName: string;
  reviews: ProductReview[];
}

export interface Category {
  id: 'cat-executive' | 'cat-tech';
  name: string;
  slug: string;
  description: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  customPrice?: number | string;
  note?: string;
}

export type ActivePage = 'home' | 'cat-executive' | 'cat-tech' | 'product' | 'quote';
