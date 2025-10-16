import { Router } from "express";
import userCTRL from "../controllers/userController.mjs";
import { check } from "express-validator";
import dotenv from "dotenv";
import auth from "../middleware/basicAuth.mjs";

dotenv.config();
const router = Router();

router
  .route("/")
  .get(auth, userCTRL.getUserInfo)
  .post(
    [
      check("password", "Please Include a password").not().isEmpty(),
      check("email", "Please include an email").not().isEmpty(),
    ],
    userCTRL.loginUser
  );
export default router;