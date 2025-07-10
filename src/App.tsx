import "./App.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

// Global Components
import Navbar from "./Customer/Component/Navbar/Navbar";

// Customer Pages
import Home from "./Customer/Pages/Home/Home";
import Product from "./Customer/Pages/product/Product";
import ProductDetail from "./Customer/Pages/ProductDetail/ProductDetail";
import Review from "./Customer/Pages/Review/Review";
import Cart from "./Customer/Pages/Cart/Cart";
import Checkout from "./Customer/Pages/Checkout/Checkout";
import Account from "./Customer/Pages/Account/Account";
import BecomeSeller from "./Customer/Pages/BecomeSeller/BecomeSeller";
import Auth from "./Customer/Pages/Auth/Auth";
import PaymentSuccess from "./Customer/Pages/PaymentSuccess";

// Seller Pages
import SellerDashboard from "./Seller/Pages/SellerDashboard/SellerDashboard";
import Dashboard from "./Seller/Pages/SellerDashboard/Dashboard";
import Products from "./Seller/Pages/Product/Products";
import Orders from "./Seller/Pages/Orders/orders";
import AddProduct from "./Seller/Pages/Product/AddProduct";
import Profile from "./Seller/Pages/Account/Profile";
import Payment from "./Seller/Pages/Payment/Payment";
import Transaction from "./Seller/Pages/Payment/Transaction";

// Admin Pages
import AdminDashboard from "./Admin/Pagess/Dashboard/AdminDashboard";
import Coupon from "./Admin/Pagess/Coupon/Coupon";
import AddNewCoupon from "./Admin/Pagess/Coupon/AddNewCoupon";
import Deal from "./Admin/Pagess/HomePages/Deal";
import ShopByCategoryTable from "./Admin/Pagess/HomePages/ShopByCategoryTable";
import ElectronicTable from "./Admin/Pagess/HomePages/ElectronicTable";
import GridTable from "./Admin/Pagess/HomePages/GridTable";
import SellerTable from "./Admin/Pagess/Seller/SellerTable";

// Redux Store
import  { useAppDispatch, useAppSelector } from "./State/Store";
import { fetchSellerProfile } from "./State/Sellers/sellerSlice";
import { fetchUserProfile } from "./Customer/Pages/Auth/authSlice";
import Wishlist from "./Customer/Pages/Wishlist/Wishlist";
import SearchResults from "./Customer/Pages/product/SearchResults";
import { createHomecategories } from "./State/Customers/customerSlice";
import { homeCategories } from "./data/HomeCategories";
import BecomeSellerGuide from "./Customer/Pages/BecomeSeller/BecomeSellerGuide";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const seller = useAppSelector((state) => state.seller);
  const jwt = localStorage.getItem("jwt");

  // ✅ Seed homepage categories (avoids duplicates with backend check)
  useEffect(() => {
    dispatch(createHomecategories(homeCategories))
      .unwrap()
      .then()
      .catch();
  }, [dispatch]);

  // ✅ Fetch seller profile if logged in
  useEffect(() => {
    if (jwt) {
      dispatch(fetchSellerProfile(jwt));
    }
  }, [dispatch, jwt]);

  // ✅ Redirect seller to dashboard if already a seller
  useEffect(() => {
    if (seller.profile && location.pathname === "/become-seller") {
      navigate("/seller");
    }
  }, [seller.profile, navigate, location.pathname]);

  // ✅ Fetch user profile
  useEffect(() => {
    if (jwt) {
      dispatch(fetchUserProfile({ jwt }));
    }
  }, [dispatch, jwt]);

  return (
    <div>
      <Navbar />

      <Routes>
        {/* Public / Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/customer/login" element={<Auth />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:category" element={<Product />} />
        <Route path="/review/:productId" element={<Review />} />
        <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetail />} />
        <Route path="/api/cart" element={<Cart />} />
        <Route path="/api/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/become-seller" element={<BecomeSeller />} />
        <Route path="/seller-guide" element={      <BecomeSellerGuide />
} />
        {/* Seller Routes */}
        <Route path="/seller" element={<SellerDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="account" element={<Profile />} />
          <Route path="payment" element={<Payment />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="logout" element={<BecomeSeller />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<SellerTable />} />
          <Route path="coupon" element={<Coupon />} />
          <Route path="add-new-coupon" element={<AddNewCoupon />} />
          <Route path="homePage" element={<GridTable />} />
          <Route path="electronics-category" element={<ElectronicTable />} />
          <Route path="shop-by-category" element={<ShopByCategoryTable />} />
          <Route path="deal" element={<Deal />} />
          <Route path="account" element={<BecomeSeller />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
