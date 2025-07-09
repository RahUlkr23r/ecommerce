import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import sellerSlice from "./Sellers/sellerSlice";
import sellerProductReducer from "../State/Sellers/sellerProductSlice"
import productSlice from "../State/Customers/ProductSlice"
import authSlice from "../Customer/Pages/Auth/authSlice"
import CartSlice from "../State/Customers/CartSlice"
import orderSlice from "../State/Customers/OrderSlice"
import addressReducer from '../State/Customers/AddressSlice';
import WishlistSlice from '../State/Customers/WishlistSlice'
import sellerOrderSlice from '../State/Sellers/sellerOrderSlice';
import transactionSlice from '../State/Sellers/transactionSlice'
import sellerReportSlice from "./Sellers/sellerReportSlice";
import adminSlice from "./Admins/adminSlice";
import customerSlice from "./Customers/customerSlice";
import adminCouponSlice from "./Admins/adminCouponSlice";
import dealSlice from "./Admins/dealSlice";
import adminControllerSlice from "./Admins/adminControllerSlice";
import createSellerSlice from "./Sellers/createSellerSlice";
import reviewSlice from "./Customers/reviewSlice";
const rootReducer=combineReducers({
product:productSlice,
auth:authSlice,
cart:CartSlice,
order:orderSlice,
address:addressReducer,
wishlist:WishlistSlice,
customer:customerSlice,
review: reviewSlice,
//Seller related reducers
seller:sellerSlice,
sellerProduct:sellerProductReducer,
createSeller:createSellerSlice,
sellerOrder:sellerOrderSlice,
transactions:transactionSlice,
sellerReport:sellerReportSlice,
// Admin related reducers
admin :adminSlice,
adminCouponSlice: adminCouponSlice,
deals: dealSlice,
adminSellers: adminControllerSlice, // Assuming you want to keep this for admin sellers
});

const Store= configureStore({
  reducer:rootReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
})
export type AppDispatch=typeof Store.dispatch;
export type RootState=ReturnType<typeof rootReducer>;
export const useAppDispatch=()=>useDispatch<AppDispatch>();
export  const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;


export default Store;



