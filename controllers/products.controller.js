import Product from "../models/product.model.js";
import { notFound } from "../utils/helper.js";

// fetching products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json({ products: products })
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message })
    }
}

// fetch product by id
export const getSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if (!product) {
            return notFound(res)
        }
        return res.status(200).json(product)
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message })
    }
}


// post a new product
export const createProduct = async (req, res) => {
    const { name, price, description, stockQuantity } = req.body
    try {
        const newProduct = new Product({
            name,
            price,
            description,
            stockQuantity,
        })

        const storedProduct = await newProduct.save();
        return res.status(201).json({ message: "New Products is created", product: storedProduct })
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessages = {};
            Object.keys(error.errors).forEach((key) => {
                errorMessages[key] = error.errors[key].message;
            })
            return res.status(400).json({ errors: errorMessages })
        }
        return res.status(400).json({ message: "Internal Server Error" })
    }
}


// update product 
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const { name, price, description, stockQuantity } = req.body

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) return notFound(res)


        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name, price, description, stockQuantity
        }, { new: true }) // -------- Return the updated product --------

        return res.status(200).json({ message: "Product updated..", product: updatedProduct });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}



// delete product 
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId);
        if (!product) return notFound(res)
        // ------------ Deleting product from DB ------------//
        await Product.findByIdAndDelete(productId)
        return res.status(204).send() // No body is sent with 204 status
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message })
    }
}
