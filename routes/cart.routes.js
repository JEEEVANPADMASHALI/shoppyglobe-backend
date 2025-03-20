import { cart, addToCart, deleteItem, updateQuantity } from "../controllers/cart.controller.js"
import authenticateToken from "../middlewares/authentication.js"

export const cartRoutes = (app) => {

    // get request(for fething cart items)
    app.get("/api/cart", authenticateToken, cart)

    // post request (for adding cart item)
    app.post("/api/cart/add-item/", authenticateToken, addToCart)
    
    // put request (for updating quantity)
    app.put("/api/cart/update-item/", authenticateToken, updateQuantity)

    // delete request(for deleting cart item)
    app.delete("/api/cart/delete-item/", authenticateToken, deleteItem)

}