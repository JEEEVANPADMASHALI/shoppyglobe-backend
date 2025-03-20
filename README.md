# **ShoppyGlobe -backend Application**  

link to repository --[https://github.com/JEEEVANPADMASHALI/shoppyglobe-backend.git](https://github.com/JEEEVANPADMASHALI/shoppyglobe-backend.git)
## **Introduction**  
This backend project helps in handling the backend operations of the shoppyglobed app 
---

## **Setup Instructions**  

### **. follow the instructions** 

ShoppyGlobe Backend - Setup Guide 🚀
This guide will help you install and set up the ShoppyGlobe Backend on your local machine. Follow these steps carefully to get started.

📌 Prerequisites
Make sure you have the following installed on your system:
* Node.js (Latest LTS recommended)
* MongoDB (MongoDB Compass included)
* A terminal or command prompt

📌 Step 1: Clone the Repository
Open your terminal and run:
git clone https://github.com/JEEEVANPADMASHALI/shoppyglobe-backend.git
cd shoppyglobe-backend

📌 Step 2: Install Dependencies
Run the following command to install all required packages:
npm install

This will install:
* Express.js
* Mongoose
* Cors
* dotenv
* jsonwebtoken (JWT for authentication)
* bcryptjs (For password hashing) 
  
You can install these I fit doesn’t install the required packages 

📌 Step 3: Configure Environment Variables
Create a .env file in the root directory and add the following:

Create a .env file in the root directory and add the following:
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/shopper
JWT_SECRET=your_secret_key_here

Replace your_secret_key_here with a strong secret key.  Visit the JWT website to confirm that your generated token is valid or not.
📌 Step 4: Set Up MongoDB Compass
1. Download & Install MongoDB Compass
    * Get it from: MongoDB Compass
    * Install and open MongoDB Compass.
2. Connect to Local MongoDB
    * In MongoDB Compass, click "New Connection"
    * Use the following connection string:

mongodb://127.0.0.1:27017 

Click "Connect"

   3.Create the Database
* Once connected, click "Create Database"
* Name it: shoppyglobe
* Create a collection named products
* (Optional) Create collections for users and carts

📌 Step 5: Run the Backend Server
     Start the backend using:
       npm start
     
📌 Step 6: API Endpoints
Use Thunder Client (VS Code extension) or Postman to test API requests.
🔹 User Authentication
* Register: POST /api/auth/register
* Login: POST /api/auth/login (Returns a JWT token)
* Delete: http://localhost:3000/api/delete-user/{id}


🔹 Product Management
* Get All Products: GET /api/products
* Get Product by ID: GET /api/products/:id
* Add Product: POST /api/products (Requires JWT Token)
* Update Product: PUT /api/products/:id (Requires JWT Token)
* Delete Product: DELETE /api/products/:id (Requires JWT Token)


🔹 Cart Management
* Get Cart: GET /api/cart (Requires JWT Token)
* Add to Cart: POST /api/cart (Requires JWT Token)
* Remove from Cart: DELETE /api/cart (Requires JWT Token)

📌 Step 7: Testing the API
   Test the Api Using Thunder Client 

    Use the token in Authorization → Bearer Token to access protected routes.

