import mongoose from "mongoose";
const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    stockQuantity: {
        required: true,
        type: Number,
        min: 0
    },
}, { timestamps: true })
const Product = mongoose.model("Product", productsSchema)
export default Product;