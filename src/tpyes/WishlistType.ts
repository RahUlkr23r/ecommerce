import {Product} from "./ProductType";
import {User} from "./usertype";

export interface Wishlist{
  id: number;
  user: User;
  products: Product[];

}
export interface WishlistState {
    wishlist: Wishlist | null;
    loading: boolean;
    error: string | null;
   
}
export interface AddproductToWishlistPayload {
    wishlistId: number;
    productId: number;
}