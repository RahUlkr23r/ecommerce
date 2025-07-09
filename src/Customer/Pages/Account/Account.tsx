// import { Divider } from "@mui/material";
// import { teal } from "@mui/material/colors";
// import React from "react";
// import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
// import Order from "./Order";
// import OrderDetails from "./OrderDetails";
// import UserDeatails from "./UserDeatails";
// import Address from "./Address/Address";
// import { userlogout } from "../Auth/authSlice";
// import { useAppDispatch } from "../../../State/Store";


// const menu = [
//   { name: "order", path: "/account/order" },
//   { name: "profile", path: "/account" },
//   { name: "cards", path: "/account/saved-card" },
//   { name: "address", path: "/account/address" },
//   { name: "logout", path: "/logout" },
// ];
// const dispatch= useAppDispatch
// const Account = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleClick = (item: any) =>{
//  if(item.path==="/logout"){
//      dispatch(userlogout(navigate));
//  }
//    navigate(item.path);
//   }
//   return (
//     <div className="px-5 lg:px-20 min-h-screen mt-10">
//       <div>
//         <h1 className="text-xl font-bold pb-5">Rahul</h1>
//       </div>
//       <Divider />
//       <div className="grid grid-cols-1 lg:grid-cols-4 lg:min-h-[78vh]">
//         <section className="col-span-1 lg:border-r lg:pr-5 py-5 h-full space-y-2">
//           {menu.map((item) => (
//             <div
//               onClick={() => handleClick(item)}
//               key={item.name}
//               className={`py-3 px-5 rounded-md cursor-pointer hover:text-white border-b  hover:bg-teal-600 ${
//                 item.path === location.pathname ? "bg-teal-600 text-white" : ""
//               }`}
//             >
//               <p className="capitalize">{item.name}</p>
//             </div>
//           ))}
//         </section>
//         <section className="col-span-2 py-5 pl-5  lg:col-span-2">
//           {/* Right side content based on route */}
//           <Routes>

//             <Route path="/" element={<UserDeatails/>}/>
//             <Route path="/order" element={<Order/>}/>
//             <Route path="/order/:orderId/:orderItemId" element={<OrderDetails/>}/>
         
//             <Route path="/address" element={  <Address/>}/>
//           </Routes>


         
      
     
        
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Account;
import React from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Divider, Button, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { userlogout } from "../Auth/authSlice";

import Order from "./Order";
import OrderDetails from "./OrderDetails";
import UserDetails from "./UserDeatails"; // ✅ Ensure the file is actually spelled correctly
import Address from "./Address/Address";

const menu = [
  { name: "Profile", path: "/account" },
  { name: "Orders", path: "/account/order" },
  { name: "Cards", path: "/account/saved-card" },
  { name: "Address", path: "/account/address" },
  { name: "Logout", path: "/logout" },
];

const Account = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const handleClick = (item: any) => {
    if (item.path === "/logout") {
      dispatch(userlogout(navigate));
    } else {
      navigate(item.path);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h2 className="text-2xl font-semibold mb-2">Please login to access your account</h2>
        <p className="text-gray-600 mb-4">You need to be logged in to view your profile and orders.</p>
        <Button
          variant="contained"
          sx={{ bgcolor: teal[600], "&:hover": { bgcolor: teal[700] } }}
          onClick={() => navigate("/customer/login")}
        >
          Login Now
        </Button>
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-20 min-h-screen mt-10">
      <Typography variant="h5" fontWeight={600} className="pb-5 text-gray-700">
        My Account
      </Typography>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-4 lg:min-h-[78vh]">
        {/* Sidebar Navigation */}
        <aside className="col-span-1 py-5 lg:pr-6 space-y-1 border-b lg:border-r lg:border-b-0">
          {menu.map((item) => (
            <div
              key={item.name}
              onClick={() => handleClick(item)}
              className={`py-3 px-4 rounded-md cursor-pointer capitalize font-medium text-sm transition duration-200
              ${
                item.path === location.pathname
                  ? "bg-teal-600 text-white"
                  : "hover:bg-teal-100 text-gray-700"
              }`}
            >
              {item.name}
            </div>
          ))}
        </aside>

        {/* Content */}
        <main className="col-span-1 lg:col-span-3 py-5 lg:pl-8">
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/:orderId/:orderItemId" element={<OrderDetails />} />
            <Route path="/address" element={<Address />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Account;
