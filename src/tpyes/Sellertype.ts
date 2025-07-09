// 🔄 Matches the backend enum exactly
export type AccountStatus =
  | "PENDING_VERIFICATION"
  | "ACTIVE"
  | "SUSPENDED"
  | "DEACTIVATED"
  | "BANNED"
  | "CLOSED";

// ✅ Main Seller Interface
export interface Seller {
  id?: number|null;
  sellerName: string;
  email: string;
  emailVarified: boolean;
  mobile: string;
  password: string;
  role: "SELLER" | string;
  GSTIN: string | null;
  accountStatus: AccountStatus; // 🔄 updated here
  bankDetails: BankDetails | null;
  businessDetails: BusinessDetails;
  pickupAddress: PickupAddress;
}

// 🏦 Bank Details
export interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountHolderName: string;
}

// 🏢 Business Details
export interface BusinessDetails {
  banner: string;
  logo: string;
  bussinessName: string;
  bussinessEmail: string;
  bussinessMobile: string;
  bussinessAddress: string;
}

// 📦 Pickup Address
export interface PickupAddress {
  id: number;
  name: string;
  address: string | null;
  locality: string | null;
  city: string;
  state: string;
  pincode: string | null;
  mobile: string | null;
}

// 📊 Seller Report
export interface SellerReport {
  id: number;
  seller: Seller;
  totalEarning: number;
  totalSale: number;
  totalTax: number;
  netEarning: number;
  totalOrder: number;
  cancleOrder: number;
  totalTransaction: number;
}
