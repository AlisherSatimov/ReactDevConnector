import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const Posts = () => {
  const { data: posts, isLoading } = useFetch("/posts");

  return isLoading ? (
    <Spinner />
  ) : (
    posts && (
      <div>
        <section className="container">
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome to the community
          </p>
        </section>
        <ul>
          {posts.map((post) => {
            return (
              <div className="container">
                <li key={post._id}>
                  <h2>Writed by {post.name}</h2>
                  <h4>POST: {post.text}</h4>
                  <p>Date Time {post.date.slice(0, 10)}</p>
                  <Link to={`/posts/${post._id}`}>Post Link</Link>
                  {console.log(post)}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default Posts;
