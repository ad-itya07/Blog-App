import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    res.send("Your Profile Page!");
  } else {
    return res.status(401).json({ message: "Unauthorized." });
  }
});

userRouter.get("/posts", async (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/blog");
  } else {
    return res.status(401).json({ message: "Unauthorized." });
  }
});

userRouter.delete("/delete-user", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const id = req.user.id;
      await prisma.user.delete({
        where: {
          id: id,
        },
      });

      req.logout();
      return res.status(200).json({
        message: "User Deleted successfully!",
        success: true,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error deleting user.",
        success: false,
        error: err,
      });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized." });
  }
});

userRouter.put("/update-user/user-name", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const { newUsername } = req.body;

      if (!newUsername) {
        return res.status(400).json({
          message: "Enter new username",
          success: false,
        });
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          user_name: newUsername,
        },
      });

      if (existingUser && existingUser.id !== req.user.id) {
        return res.status(400).json({
          message: "This username already exist!",
          success: false,
        });
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          user_name: newUsername,
        },
      });

      return res.status(200).json({
        message: "Successfully updated username!",
        success: true,
        updatedUser,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error updating username",
        success: false,
        error: err,
      });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized." });
  }
});

userRouter.put("/update-user/user-password", async (req, res) => {
  const user = req.user;
  if (req.isAuthenticated()) {
    try {
      const { newPassword } = req.body;

      if (!newPassword) {
        return res.status(400).json({
          message: "Enter new password!",
          success: false,
        });
      }

      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(newPassword , 10);
      } catch (err) {
        return res.status(500).json({
            message : 'Error hashing password',
            success : false,
            error : err,
        });
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          user_password: hashedPassword,
        },
      });

      return res.status(200).json({
        message: "Successfully updated password!",
        success: true,
        updatedUser,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error updating password!",
        success: false,
        error: err,
      });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized." });
  }
});

export default userRouter;
