import { loginUser, registerUser, getUserDetails ,deleteUserById} from "../controllers/users.controller.js";
import authenticateToken from "../middlewares/authentication.js";

export const userRoutes = (app) => {
    app.post("/api/register", registerUser);
    app.post("/api/login", loginUser);
    
    // Protected route to fetch user details
    app.get("/api/user", authenticateToken, getUserDetails);

    // DELETE request for deleting a user
    app.delete("/api/delete-user/:userId", authenticateToken, deleteUserById);

};
