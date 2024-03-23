
import { Link } from "react-router-dom";
import service from "../../appwrite/config";
export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div>
        <img src={service.filePreview(featuredImage)} alt={title} />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}
