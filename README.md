🛒 E-Commerce Web Application
An end-to-end full-stack eCommerce web application built using React, Redux, Material UI, and Spring Boot. It supports customer and seller flows, product management, checkout, order tracking, and admin deals — all in one scalable platform.

🚀 Features
👤 Customer
User Signup/Login with OTP (Email-based)

Browse products by categories/subcategories

Search and filter products

Product detail page with:

Image carousel

Sizes, colors, reviews

Similar product suggestions

Add to Cart & Wishlist

Checkout with address & payment integration (Razorpay/Stripe)

Order tracking and history

🛍️ Seller
Seller registration & login with OTP

Add/Edit/Delete products

View own product listings

Manage orders and view transaction history

🛠️ Admin
Create category-based deals

Manage home categories

Dashboard for monitoring

🧰 Tech Stack
Frontend
React.js

Redux Toolkit

Material UI (MUI)

Formik + Yup (Form validation)

Axios (API calls)

Cloudinary (Image upload)

Backend
Spring Boot 3

Spring Security + JWT (Authentication)

MySQL (Database)

Lombok (Boilerplate reduction)

JPA/Hibernate (ORM)

📦 Project Structure
bash
Copy
Edit
/frontend         // React + Redux Frontend
/src
  /components
  /pages
  /State          // Redux store & slices
  /api            // Axios configs
  /utils

/backend          // Spring Boot Backend
/src
  /controller
  /service
  /model
  /repository
  /config         // JWT + Security
📸 Screenshots
Add some UI screenshots like:

Homepage

Product Detail

Cart/Checkout

Seller Dashboard

Admin Deal Management

🛠️ Setup Instructions
Prerequisites
Node.js (v18+)

Java 17+

MySQL

Maven

1. Backend Setup
bash
Copy
Edit
cd backend
# Configure application.properties with your DB
# Create DB: ecommerce

mvn clean install
mvn spring-boot:run
2. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
Make sure to configure your .env for frontend if you're using API base URLs, Cloudinary, or Razorpay keys.

📬 API Endpoints (Sample)
Method	Endpoint	Description
POST	/auth/signup	Register user/seller
POST	/auth/send-otp	Send OTP to email
POST	/auth/signin	OTP-based login
GET	/products/category/{id}	Fetch by category
POST	/order/create	Place an order
POST	/seller/product	Add product (seller)
GET	/admin/deals	Admin deals

✅ Todo (In Progress)
✅ Responsive Mobile UI

✅ JWT refresh token logic

⏳ Add Product Ratings by Users

⏳ Admin analytics dashboard

⏳ Inventory Management for sellers

⏳ Delivery partner module

🙋‍♂️ Author
Rahul Kumar 
Full Stack Developer
📧 rahulkumar8684singh@gmail.com
📞 +91-9334398684

