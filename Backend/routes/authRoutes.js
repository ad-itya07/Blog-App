import express from "express";
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import passport from "../config/passportconfig.js";
import { loginAuthenticate } from "../middlewares/authMiddleware.js";

const prisma = new PrismaClient();
const authRouter = express.Router();

authRouter.post("/sign-up", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      if (!username || !password) {
        return res.status(400).json({
          message: "please fill all fields",
          success: false,
        });
      }

      const isFound = await prisma.user.findUnique({
        where: { user_name: username },
      });
      if (isFound) {
        return res.status(400).json({
          message: "User exist!",
          success: false,
        });
      }
  
      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 10);
      } catch (err) {
        return res.status(500).json({
          message: "Error Hashing",
          success: false,
          error: err,
        });
      }
      try {
        await prisma.user.create({
          data: {
            user_name: username,
            user_password: hashedPassword,
          },
        });
      } catch (err) {
        res.status(500).res.status(500).json({
          message: "Erron Updating db",
          success: false,
          error: err,
        });
      }
  
      res.status(200).json({
        'message' : 'User registered successfully!',
        'success' : true,
      })
    } catch (err) {
      res.status(500).json({
        message: "Signup failed!",
        success: false,
        error: err,
      });
    }  
  });

authRouter.post('/login' , loginAuthenticate);

authRouter.get('/profile' , async (req,res) => {
    if (req.isAuthenticated()) {
        // res.send(req.body);
        // res.send(req.sessionID);
    } else {
        res.redirect("/login");
    }
});

export default authRouter;