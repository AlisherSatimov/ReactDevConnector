import { Spinner } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const Post = () => {
  const { postId } = useParams();
  const { data: post, isLoading } = useFetch(`/posts/${postId}`);

  if (!postId) return <Navigate to="/posts" />;

  return isLoading ? (
    <Spinner />
  ) : (
    post && (
      <div className="container d-flex justify-content-center align-items-center flex-column gap-4 mt-4">
        <img src={post.avatar} width={200} alt="" />
        <h1>{post.name}</h1>
        <h2 className="text-center">{post.text}</h2>
        <p>Posted: {post.date.slice(0, 10)}</p>
        {console.log(post)}
      </div>
    )
  );
};

export default Post;
