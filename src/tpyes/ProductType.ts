import { Review } from "./reviewType";
import { Seller } from "./Sellertype";

export interface Product {
  products: any;
  product: any;  // Changed to PascalCase
  id: number;
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  discountPercent: number;
  brand: string;
  quantity: number;  // Changed to optional
  sizes: string[];
  colors: string[];  // Removed single 'color' field
  features: string[]; // Changed to array of features
  sizeGuide?: SizeGuide; // More specific type
  isNew: boolean;
  images: string[];
  totalPrice:number;
  rating: number;   // Consider adding if you track actual rating
  category: Category;
  seller?: Seller;
  createdAt: Date | string; // More flexible for API responses
  reviews: Review;  // Fixed typo (was 'review')
  stockStatus?: 'in-stock' | 'out-of-stock' | 'low-stock'; // Suggested addition
}

export interface SizeGuide {
  description?: string;
  measurements?: Record<string, string>; // or more specific typing
  image?: string;
}

export interface Category {
  categoryId?: number; // Made optional for flexibility
  id: number;  // Made non-optional (usually needed)
  name: string;
  level: number;
  slug: string;  // Renamed from categoryId if it's a URL slug
  parentCategory?: Category;
  children?: Category[];  // Suggested for hierarchical data
}