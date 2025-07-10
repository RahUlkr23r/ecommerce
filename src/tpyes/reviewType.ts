import { Product } from "./ProductType";
import { User } from "./usertype";

export interface Review {
  id: number;
  reviewText: string;
  rating: number;
  productImages: string[];
  product: Product; // optional? → if yes: product?: Product;
  user: User;
  createAt: string;
}
