import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPost } from "../Posts/Posts";
import axios from "axios";
import { useState } from "react";

interface SinglePostProps {
  userId: string | undefined; // Accept a userId prop of type string
  post: IPost; // Accept a post prop of type IPost
  className?: string; // Optional className for additional styling
}

export function SinglePost({ userId, post, className }: SinglePostProps) {
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isLiked, setIsLiked] = useState(false); // Track if the post is liked or not

  const handleToggleLike = async () => {
    try {
      if (post.hasLiked || isLiked) {
        // Dislike the post
        await axios.post(
          "http://localhost:8080/post/dislike",
          {
            postId: post.id,
            userId: userId,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLikesCount((prev) => Math.max(prev - 1, 0)); // Ensure likes don't go below 0
      } else {
        // Like the post
        await axios.post(
          "http://localhost:8080/post/like",
          {
            postId: post.id,
            userId: userId,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLikesCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked); // Toggle the like state
    } catch (error) {
      console.error("Error toggling like/dislike", error);
    }
  };

  return (
    <Card className={cn("w-[380px]", className)}>
      <CardHeader>
        <CardTitle>{post.caption}</CardTitle> {/* Display the post caption */}
        <img src={post.postLink} alt="Post" />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Likes: {likesCount}</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button className="w-full" onClick={handleToggleLike}>
          {post.hasLiked ||  isLiked ? (
            <>
              Dislike
              <span className="ml-2" role="img" aria-label="dislike">
                👎
              </span>
            </>
          ) : (
            <>
              Like
              <span className="ml-2" role="img" aria-label="like">
                👍
              </span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
