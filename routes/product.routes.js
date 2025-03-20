import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from  "../controllers/products.controller.js"
import { validate } from "../middlewares/validate.js"

export const productRoutes = (app) => {

    // fetching products 
    app.get("/api/products", getAllProducts);

    // fetching product by productId 
    app.get("/api/products/:id", getSingleProduct);

    // adding a new product 
    app.post("/api/product", validate, createProduct);
    
    // updating an existing product 
    app.put("/api/product/:id", validate, updateProduct);

    // deleting a product 
    app.delete("/api/product/:id", deleteProduct);
}