export const Price = [
  { name: "Under ₹500", min: 0, max: 500, value: "500" },
  { name: "₹500 - ₹1000", min: 500, max: 1000, value: "1000" },
  { name: "₹1000 - ₹2000", min: 1001, max: 2000, value: "2000" },
  { name: "₹2000 - ₹3000", min: 2001, max: 3000, value: "3000" },
  { name: "₹3000 - ₹5000", min: 3001, max: 5000, value: "5000" },
  { name: "₹5000 - ₹7000", min: 5001, max: 7000, value: "7000" },
  { name: "₹7000 - ₹9000", min: 7001, max: 9000, value: "9000" },
  { name: "₹9000 & Above", min: 9001, max: undefined, value: "10000" } // ✅ No max sent to backend
];
