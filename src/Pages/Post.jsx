import { Spinner } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const Post = () => {
  const { postId } = useParams();
  const { data: post, isLoading } = useFetch(`/posts/${postId}`);

  if (!postId) return <Navigate to="/posts" />;

  return isLoading ? <Spinner /> : post && <div>Post</div>;
};

export default Post;
