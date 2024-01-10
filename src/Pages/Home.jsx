import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section
      id="showcase"
      className="d-flex flex-column justify-content-center align-items-center text-white"
    >
      <h1 className="display-1 fw-bold">Developer Connector</h1>
      <p className="fs-5">
        Create a developer profile/portfolio, share posts and get help from
        other developers
      </p>
      <div className="d-flex gap-3">
        <Button as={Link} to="/register" variant="info">
          Sign up
        </Button>
        <Button as={Link} to="/login" variant="light">
          Login
        </Button>
      </div>
    </section>
  );
};

export default Home;
