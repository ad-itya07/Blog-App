import express from "express";
import authController from "../controllers/authController.js";
import { loginAuthenticate } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/login", loginAuthenticate, authController.login);
authRouter.get("/profile", authController.profile);

export default authRouter;
