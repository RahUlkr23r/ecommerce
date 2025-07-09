import React, { useState } from 'react';
import SellerAccountForm from './SellerAccountForm';
import SellerLoginForm from './SellerLoginForm';
import { Button } from '@mui/material';

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
      {/* Form Section */}
      <section className="col-span-1 md:col-span-2 lg:col-span-2 p-6 md:p-10 shadow-md bg-white">
        {!isLogin ? <SellerAccountForm /> : <SellerLoginForm />}

        <div className="mt-10 space-y-2">
          <h1 className="text-center text-sm font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </h1>
          <Button
            onClick={handleShowPage}
            fullWidth
            sx={{ py: '11px' }}
            variant="outlined"
          >
            {isLogin ? 'Register' : 'Login'}
          </Button>
        </div>
      </section>

      {/* Promo Image Section */}
      <section className="hidden md:flex col-span-1 lg:col-span-3 justify-center items-center bg-gray-50">
        <div className="lg:w-[70%] px-2 space-y-5 mt-5">
          <div className="space-y-2 font-bold text-center">
            <p className="text-2xl">Join the MarketPlace Revolution</p>
            <p className="text-teal-500">Boost Your Sales Today</p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/adha-shopping-trolley-laptop-front-side-white-background_187299-39324.jpg?ga=GA1.1.177161967.1743955239&semt=ais_hybrid&w=740"
            alt="Shopping Promotion"
            className="w-full object-cover rounded-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
