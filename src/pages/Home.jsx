import React from "react";
import service from "../appwrite/config";
import { PostCard } from "../component/index";

export default function Home() {
  const [posts, setposts] = React.useState(null);
 
  React.useEffect(() => {
    service.getPosts().then((post) => {
      if (post) {
        setposts(post.documents);
      }
    });
  }, []);
  if (posts.length === 0) {
    return <h2>Login to read Post</h2>;
  } else {
    return (
      <div className="w-full p-8">
        <div>
          {posts.map((post) => (
            <div className="p-2" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
