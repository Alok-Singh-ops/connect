import { Request, Response } from "express";
import { getUserByEmail, getUserEmailFromToken } from "../lib/utils";
import { s3Client } from "../lib/s3Bucket";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prismaClient } from "../lib/prismaClient";
import { handleError } from "../errors/errors";

class PostController {
  public async createPost(req: Request, res: Response) {
    const { caption } = req.body; // Extract caption from the request body
    if (!req.file) {
      return res.status(400).json({ message: "Please provide a valid file" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    const email = getUserEmailFromToken(token);
    if (!email) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    try {
      // Get user information
      const user = await getUserByEmail(email);
      // Upload file to S3
      const params = {
        Bucket: "connect-user",
        Key: `${req.file.originalname}-${Date.now()}`,
        Body: req.file.buffer, // Use buffer directly
        ContentType: req.file.mimetype,
      };
      await s3Client.send(new PutObjectCommand(params));
      const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

      // Create a new post in the database
      const newPost = await prismaClient.post.create({
        data: {
          caption,
          postLink: fileUrl,
          userId: user.id,
          likesCount: 0, // Initialize likesCount to 0
        },
      });
      return res.status(200).json({
        message: "Post created successfully",
        post: newPost,
      });
    } catch (err) {
      console.error("Post creation error:", err);
      return res.status(500).json({ message: "Failed to create post" });
    }
  }

  public async getPost(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }
  
    try {
      // Fetch the user based on email
      const user = await getUserByEmail(email);
  
      // Fetch all posts created by the user
      const posts = await prismaClient.post.findMany({
        where: {
          userId: user.id,
        },
        include: {
          likes: {
            where: {
              userId: user.id, // Check if the post is liked by the requesting user
            },
          },
        },
      });
  
      // Map posts to include whether the user has liked each post
      const postsWithLikes = posts.map((post) => ({
        ...post,
        hasLiked: post.likes.length > 0, // If the post has likes by the user
      }));
  
      // Return the posts with the 'hasLiked' field
      return res.status(200).json(postsWithLikes);
    } catch (error) {
      handleError(error, res);
    }
  }
  

public async likePost(req: Request, res: Response) {
  const { postId, userId } = req.body; // Assuming userId is sent in the request
  try {
    // Check if the user has already liked the post
    const existingLike = await prismaClient.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      return res.status(400).json({
        message: "You have already liked this post.",
      });
    }

    // Create a new entry in the Like table
    await prismaClient.like.create({
      data: {
        postId: postId,
        userId: userId,
      },
    });

    // Increment the likes count in the Post table
    await prismaClient.post.update({
      where: {
        id: postId,
      },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });

    res.status(200).json({
      message: "Post liked successfully",
    });
  } catch (error) {
    handleError(error, res);
  }
}


  public async dislikePost(req: Request, res: Response) {
    const { postId } = req.body;
    try {
      await prismaClient.post.update({
        where: {
          id: postId,
        },
        data: {
          likesCount: {
            decrement: 1,
          },
        },
      });
      res.status(200).json({
        message: "Post disliked Successfully",
      });
    } catch (error) {
      handleError(error, res);
    }
  }
}

export default PostController;
