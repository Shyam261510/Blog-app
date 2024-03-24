import React from "react";
import { postForm } from "../component/index";
import service from "../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";
export default function EditPost() {
  const [post, setpost] = React.useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (slug) {
      service.getpost(slug).then((post) => {
        if (post) {
          setpost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);
  return post ? <div className="py-8">

    <postForm post={post}/>
  </div> : null
}
