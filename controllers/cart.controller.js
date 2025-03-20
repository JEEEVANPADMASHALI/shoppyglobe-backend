import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"
import { calculateTotalPriceOfCartItem, notFound } from "../utils/helper.js"


// getting cart details
export const cart = async (req, res) => {
    const userId = req.user.userId

    // getting cart by userId
    try {
        const cart = await Cart.findOne({ userId })
        return res.status(200).json({ cart: cart })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// adding products to cart
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body
    const userId = req.user.userId
    try {
        const product = await Product.findById(productId)
        if (!product) return notFound(req);

        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }
        const isItemExist = cart.items.find((item) => item.productId.toString() === productId)

        if (isItemExist) {
            return res.status(400).json({ message: "Item already exist in the cart" })
        }
        cart.items.push({ productId, quantity, price: product.price })
        cart.totalPrice = calculateTotalPriceOfCartItem(cart.items)
        await cart.save();
        return res.status(200).json({ message: "Item added to the cart..", cart: cart })
    }
    catch (error) {
        return res.status(500).json({ message: "Server error :", error: error.message });
    }
}


// update product quantity in cart
export const updateQuantity = async (req, res) => {
    const { quantity, productId } = req.body
    const userId = req.user.userId
    try {
        const cart = await Cart.findOne({ userId })
        if (cart.items.length === 0) return res.status(400).json({ message: "Your cart is empty." })

        const item = cart.items.find((item) => item.productId.toString() === productId)
        if (!item) {
            return notFound(res, "Item");
        }

        // updating the quantity
        item.quantity = quantity

        // calculating total price
        cart.totalPrice = calculateTotalPriceOfCartItem(cart.items)
        await cart.save()
        return res.status(200).json({ message: "product quantity is updated.", cart: cart });
    } catch (error) {
        return res.json({ error: error.message })
    }
}


// deleting product from cart
export const deleteItem = async (req, res) => {
    const { productId } = req.body
    const userId = req.user.userId

    try {
        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return notFound(res, "Cart")
        }    
        const filteredItems = cart.items.filter((item) => item.productId.toString() !== productId)
        if (filteredItems.length === cart.items.length) {
            return notFound(res, "Item")
        }    
        // updating cart items after deleting an item
        cart.items = filteredItems
        cart.totalPrice = calculateTotalPriceOfCartItem(filteredItems)

        await cart.save();
        return res.status(200).json({ message: 'Item deleted from cart', cart: cart });
    }    
    catch (error) {
        return res.status(500).json({ error: error.message });
    }    
}    
