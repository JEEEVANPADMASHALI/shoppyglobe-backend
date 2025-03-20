import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

// post user 
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User already exists" })

        // encrypting password 
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ name, email, password: hashPassword })
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: newUser })
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error :', error: error.message })
    }
}

// post user(login) 

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found!" });

        // Compare entered password with hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials!" });

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET_KEY, 
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};
//Fetch the Logged-in User Details
export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ message: "User not found!" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};
//deleting user
export const deleteUserById = async (req, res) => {
    const { userId } = req.params; // Get user ID from request params

    try {
        // Find and delete the user
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return notFound(res, "User");
        }

        // Delete the user's cart (if it exists)
        await Cart.findOneAndDelete({ userId });

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};