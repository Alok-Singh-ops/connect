import useGetEmailFromToken from "@/hooks/useGetEmail";
import { useEffect, useState } from "react";
import { SinglePost } from "../SinglePost/SinglePost";
import { API } from "@/api/api";

export interface IPost{
  id: string;
  caption: string;
  postLink: string;
  likesCount: number;
  hasLiked: boolean;
}

const Posts = () => {
  const [data, setData] = useState([]);
  const userData = useGetEmailFromToken();
  // Destructure only if userData is not null
  const email = userData?.email;
  const token = userData?.token;
  const userId = userData?.userId

  useEffect(() => {
    const getPosts = async () => {
      if (!email || !token) return; // Ensure email and token are available before making the request
      try {
        const response = await API.post(
          "/post/getPosts",
          { email },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data); // Update state with the fetched posts
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    getPosts(); // Invoke the async function
  }, [email, token]); // Add email and token as dependencies

  return (
    <div>
      <h1>Posts</h1>
      <div className="flex justify-center gap-8 flex-wrap">
      {data.length > 0 ? (
        data.map((post:IPost) => 
        <SinglePost key={post.id} post={post}
        userId={userId}
        />)
      ) : (
        <p>No posts available</p>
      )}
      </div>
    </div>
  );
};

export default Posts;
