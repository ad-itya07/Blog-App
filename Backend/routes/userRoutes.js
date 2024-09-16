import express from "express";
import userController , {upload} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", userController.getUserProfile);
userRouter.get("/posts", userController.getUserPosts);
userRouter.delete("/delete-user", userController.deleteUser);
userRouter.put("/update-user/user-name", userController.updateUserName);
userRouter.put("/update-user/user-password", userController.updateUserPassword);
userRouter.put("/update-user/profile-pic", upload.single('profile_pic'), userController.updateUserProfilePic);

export default userRouter;
