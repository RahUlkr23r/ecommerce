import { CartItem } from "../tpyes/CartType"; // Typo fixed from "tpyes" to "types"

export const sumCartItemMrpPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total, item) => total + item.mrpPrice * item.quantity,
    0
  );
};

export const sumCartItemSellingPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total, item) => total + item.sellingPrice * item.quantity,
    0
  );
};
