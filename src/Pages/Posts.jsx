import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { FaUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../Store/Slices/post";

const Posts = () => {
  const { data, isLoading } = useFetch("/posts");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPosts(data));
  }, [data, dispatch]);

  const posts = useSelector((store) => store.post.posts);

  async function handleCreatePost(e) {
    e.preventDefault();

    if (!text) return toast("Text is required", { type: "error" });

    setLoading(true);
    try {
      const { data } = await axios.post("/posts", { text });
      dispatch(setPosts([data, ...posts]));
    } catch (error) {
      console.log(error);
      const errors = error?.response?.data?.errors;
      if (errors?.length > 0) {
        errors.forEach((err) => {
          toast(err.msg, { type: "error" });
        });
      }
    } finally {
      setLoading(false);
      setText("");
    }
  }

  return (
    <section>
      <Container>
        <h1 className="text-info display-4 fw-bold">Posts</h1>
        <p className="fs-4">
          <FaUser /> Welcome to the community
        </p>
        <p className="bg-info text-light py-2 px-4">Say Something...</p>
        <Form className="d-grid gap-3 my-3" onSubmit={handleCreatePost}>
          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            as="textarea"
            placeholder="Create a Post"
          />
          <Button type="submit" variant="dark" disabled={loading}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </Form>
        {isLoading ? (
          <Spinner />
        ) : (
          posts && (
            <div>
              <ul>
                {posts.map((post) => {
                  return (
                    <div className="card" key={post._id}>
                      <div className="card-body">
                        <li className="list-group-item d-flex align-items-center px-5 gap-5">
                          <div className="d-flex flex-column align-items-center">
                            <img
                              src={post.avatar}
                              width={100}
                              className="rounded-circle"
                              alt=""
                            />
                            <h4>{post.name}</h4>
                          </div>
                          <div>
                            <h5>{post.text}</h5>
                            <small>Posted on {post.date.slice(0, 10)}</small>
                          </div>
                          <Link to={`/posts/${post._id}`}>
                            <button className="btn btn-primary text-light">
                              Disscuss
                            </button>
                          </Link>
                        </li>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          )
        )}
      </Container>
    </section>
  );
};

export default Posts;
