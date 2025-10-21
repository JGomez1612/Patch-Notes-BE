import { Router } from "express";
import { check } from "express-validator";
import userCTRL from "../controllers/userController.mjs";

const router = Router();

// Register User Route
router
    .route("/")
    .post(
        [
            check("username", "Please include a valid username").isLength({ min: 4 }),
            check("password", "Password must be at least 6 characters long").isLength(
                { min: 6 }
            ),
            check("email", "Please include a valid email").isEmail(),
        ],
        userCTRL.registerUser
    );

// Get user profile by ID (or current user via request body)
router
    .route("/profile")
    .post(userCTRL.getUserProfile);

// Update and Delete User
router
    .route("/:id")
    .put(userCTRL.updateUser)
    .delete(userCTRL.deleteUser);
    
export default router;
