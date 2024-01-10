import { FaUser } from "react-icons/fa6";
import { Button, Form, Spinner } from "react-bootstrap";
import Link from "../Components/Link";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { localTokenKey, reqTokenHederKey } from "../constants";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email) return toast("Email is required!", { type: "error" });
    if (!password) return toast("Password is required!", { type: "error" });
    if (password.length < 6)
      return toast("Password must be at least 6 characters long!", {
        type: "error",
      });
    setLoading(true);
    try {
      let {
        data: { token },
      } = await axios.post("/auth", { email, password });

      localStorage.setItem(localTokenKey, token);
      toast("Logged in successfully", { type: "success" });
      axios.defaults.headers.common[reqTokenHederKey] = token;
      navigate("/dashboard");
    } catch (error) {
      if (error.response.status === 400) {
        error.response.data.errors.forEach((err) =>
          toast(err.msg, { type: "error" })
        );
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  }

  const token = localStorage.getItem(localTokenKey);
  if (token) return <Navigate to="/dashboard" />;

  return (
    <section>
      <div className="container">
        <h1 className="text-info display-4 fw-bold">Sign In</h1>
        <p className="fs-4">
          <FaUser /> Sign Into Your Account
        </p>
        <Form onSubmit={handleLogin} className="d-grid gap-3">
          <Form.Control
            value={email}
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="info" disabled={loading}>
            {loading ? <Spinner /> : "Login"}
          </Button>
        </Form>
        <p className="mt-3">
          Sign Into Your Account?{" "}
          <span className="text-info">
            <Link to="/register">Sign up</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
