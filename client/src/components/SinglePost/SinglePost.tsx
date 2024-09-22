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
  post: IPost; // Accept a post prop of type IPost
  className?: string; // Optional className for additional styling
}

export function SinglePost({ post, className }: SinglePostProps) {
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const handleLike = async ()=>{
    try {
        await axios.post("http://localhost:8080/post/like",{
          postId: post.id
        },{
          headers:{
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        setLikesCount(prev => prev + 1)
    } catch (error) {
      console.error("Error liking post", error);
    }
  }

  const handleDislike = async ()=>{
    if (likesCount <= 0) {
      return
    }
    try {
        await axios.post("http://localhost:8080/post/dislike",{
          postId: post.id
        },{
          headers:{
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        setLikesCount(prev => prev - 1)
    } catch (error) {
      console.error("Error disliking post", error);
    }
  }

  return (
    <Card className={cn("w-[380px]", className)}>
      <CardHeader>
        <CardTitle>{post.caption}</CardTitle> {/* Display the post caption */}
        <img
          src={post.postLink}
        /> 
      </CardHeader>
      <CardContent className="grid gap-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Likes: {likesCount}
            </p>
          </div>
 
      </CardContent>
      <CardFooter
        className="flex gap-4"
      >
        <Button className="w-full"
          onClick={handleLike}
        >
          Like
            <span className="ml-2" role="img" aria-label="like">
              👍
            </span>
        </Button>
        <Button className="w-full"
          onClick={handleDislike}
        >
          Dislike
          <span className="ml-2" role="img" aria-label="dislike">
            👎
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
