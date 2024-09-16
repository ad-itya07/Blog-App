import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class authController {
  async signUp(req, res) {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        return res.status(400).json({
          message: "Please fill all fields",
          success: false,
        });
      }

      const isFound = await prisma.user.findUnique({
        where: { user_name: username },
      });

      if (isFound) {
        return res.status(400).json({
          message: "User exists!",
          success: false,
        });
      }

      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 10);
      } catch (err) {
        return res.status(500).json({
          message: "Error hashing password",
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
        return res.status(500).json({
          message: "Error updating database",
          success: false,
          error: err,
        });
      }

      return res.status(200).json({
        message: "User registered successfully!",
        success: true,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Signup failed!",
        success: false,
        error: err,
      });
    }
  }

  async login(req, res) {}

  async profile(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/user');
    } else {
      res.status(401).json({ message: "Unauthorized." });
    }
  }
}

export default new authController();
