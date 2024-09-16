import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { promises as fsPromises } from "fs";

const prisma = new PrismaClient();

class userController {
  async getUserProfile(req, res) {
    if (req.isAuthenticated()) {
      res.send("Your Profile Page!");
    } else {
      return res.status(401).json({ message: "Unauthorized." });
    }
  }

  async getUserPosts(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/blog");
    } else {
      return res.status(401).json({ message: "Unauthorized." });
    }
  }

  async deleteUser(req, res) {
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
  }

  async updateUserName(req, res) {
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
          where: { user_name: newUsername },
        });

        if (existingUser && existingUser.id !== req.user.id) {
          return res.status(400).json({
            message: "This username already exists!",
            success: false,
          });
        }

        const updatedUser = await prisma.user.update({
          where: { id: req.user.id },
          data: { user_name: newUsername },
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
  }

  async updateUserPassword(req, res) {
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
          hashedPassword = await bcrypt.hash(newPassword, 10);
        } catch (err) {
          return res.status(500).json({
            message: "Error hashing password",
            success: false,
            error: err,
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
  }

  async updateUserProfilePic(req, res) {
    if (req.isAuthenticated()) {
      try {
        if (!req.file) {
          return res.status(400).json({
            message: "No Image upload!",
            success: false,
          });
        }

        let result;
        try {
          result = await cloudinary.uploader.upload(req.file.path, {
            folder: "profile_pics",
            public_id: `${req.user.id}-profile-pic`,
          });
        } catch (err) {
          return res.status(500).json({
            message: "Error uploading to cloudinary!",
            success: false,
            error: err,
          });
        }

        try {
          await fsPromises.unlink(req.file.path);
        } catch (err) {
          return res.status(500).json({
            message: "Error unlinking file from local-storage!",
            success: false,
            error: err,
          });
        }

        try {
          const profilePic = await prisma.userProfilePic.upsert({
            where: {
              userId: req.user.id,
            },
            update: {
              url: result.secure_url,
            },
            create: {
              userId: req.user.id,
              url: result.secure_url,
            },
          });

          let user = req.user;
          return res.status(200).json({
            message: "Profile Picture updated successfully!",
            success: true,
            profilePic,
          });
        } catch (err) {
          return res.status(500).json({
            message: "Error updating profile pic!",
            success: false,
            error: err,
          });
        }
      } catch (err) {
        return res.status(500).json({
          message: "Couldn't change profile pic1",
          success: false,
          error: err,
        });
      }
    } else {
      return res.status(400).json("unAuthorised");
    }
  }

  async deleteUserProfilePic (req,res) {

  }
}

export default new userController();
