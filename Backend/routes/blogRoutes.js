import express from "express";
import blogController from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get("/", blogController.getDashboard);
blogRouter.post("/all-posts", blogController.getAllPosts);
blogRouter.post("/create-post", blogController.createPost);

export default blogRouter;
