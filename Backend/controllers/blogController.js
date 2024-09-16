import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class blogController {
  async getDashboard(req, res) {
    if (req.isAuthenticated()) {
      res.send("Your Blog Dashboard!");
    } else {
      return res.status(401).json({ message: "Unauthorized." });
    }
  }

  async getAllPosts(req, res) {
    const user = req.user;
    if (req.isAuthenticated()) {
      try {
        const posts = await prisma.post.findMany({
          where: { authorId: user.id },
          include: { author: true },
        });

        if (!posts) {
          return res.status(500).json({
            message: "Couldn't fetch Posts",
            success: false,
          });
        }

        if (posts.length === 0) {
          return res.status(200).json({
            message: "No Posts Yet!",
            success: true,
            posts,
          });
        }

        res.status(200).json(posts);
      } catch (err) {
        return res.status(500).json({
          message: "Couldn't fetch posts!",
          success: false,
        });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized." });
    }
  }

  async createPost(req, res) {
    const user = req.user;

    if (req.isAuthenticated()) {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({
          message: "Title and Content are Required!",
          success: false,
        });
      }

      try {
        const newPost = await prisma.post.create({
          data: {
            title,
            content,
            author: { connect: { id: user.id } },
          },
        });

        return res.status(200).json({
          message: "Post created successfully!",
          success: true,
          post: newPost,
        });
      } catch (err) {
        return res.status(400).json({
          message: "Failed to create post",
          success: false,
        });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized." });
    }
  }
}

export default new blogController();
