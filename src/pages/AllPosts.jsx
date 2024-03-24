import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { PostCard } from "../component/index";
export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((post) => {
      if (post) setPosts(post.documents);
    });
  }, []);

  return (
    <div className="w-full py-8">
      {posts.map((post) => {
        <div key={post.$id}>
          <PostCard post={post} />
        </div>;
      })}
    </div>
  );
}
