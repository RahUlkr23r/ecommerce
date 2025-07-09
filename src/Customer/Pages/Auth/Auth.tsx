import React, { useState } from "react";
import CustomerLogin from "./CustomerLogin";
import CustomerRegister from "./CustomerRegister";
import { Button, Paper } from "@mui/material";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-gray-50 px-4">
      <Paper
        elevation={6}
        className="w-full max-w-md rounded-xl overflow-hidden shadow-lg bg-white"
      >
        <img
          className="w-full h-35 object-cover"
          src="https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg?ga=GA1.1.177161967.1743955239&semt=ais_hybrid&w=740"
          alt="Login Illustration"
        />

        <div className="p-6 mt-4">
          {isLogin ? <CustomerLogin /> : <CustomerRegister />}

          <div className="flex items-center justify-center gap-2 mt-6">
            <p className="text-sm text-gray-700">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              onClick={() => setIsLogin(!isLogin)}
              size="small"
              variant="text"
              sx={{ textTransform: "capitalize" }}
            >
              {isLogin ? "Create Account" : "Login"}
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Auth;
