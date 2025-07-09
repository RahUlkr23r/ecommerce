import { Product } from "./ProductType";
import { User } from "./usertype";

export interface Review {
  id: number;
  reviewText: string;
  rating: number;
  productImages: string[];
  product: Product;  // ⬅️ Marked as optional
  user: User;
  createAt: string;
}
