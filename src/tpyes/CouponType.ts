import { Cart } from './CartType'



export interface Coupon {
  id: number;
  code: string;
  discountPercentage: number;
  validateStartDate: string;   // ✅ Update field name
  validateEndDate: string;     // ✅ Update field name
  minimumOrderValue: number;
  active: boolean;
}


export interface CouponState {
  coupons: Coupon[];
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  couponCreated: boolean;
  couponApplied: boolean;
}
