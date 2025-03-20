import express from "express";
import connectDB from "./db/db.js";
import { config as configDotenv } from "dotenv";
import { userRoutes } from "./routes/user.routes.js";
import { productRoutes } from "./routes/product.routes.js";
import { cartRoutes } from "./routes/cart.routes.js";

configDotenv();

const app = express(); //creating express app 
app.use(express.json())

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}...`))


await connectDB(process.env.DB_URI); //Connecting to the database

// accesing all routes 
userRoutes(app)
cartRoutes(app)
productRoutes(app)