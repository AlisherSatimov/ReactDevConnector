import axios from "axios";
import { useState } from "react";
import { Button, Spinner, Form } from "react-bootstrap";
import { FaUser } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { localTokenKey, reqTokenHederKey } from "../constants";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!name) return toast("Name is required!", { type: "error" });
    if (!email) return toast("Email is required!", { type: "error" });
    if (!password) return toast("Password is required!", { type: "error" });
    if (!confirmPassword)
      return toast("Password confirmation is required!", { type: "error" });
    if (password.length < 6)
      return toast("Password must be at least 6 characters long!", {
        type: "error",
      });
    if (password !== confirmPassword)
      return toast("Passwords do not match!", {
        type: "error",
      });

    setLoading(true);
    try {
      let {
        data: { token },
      } = await axios.post("/users", { name, email, password });

      localStorage.setItem(localTokenKey, token);
      toast("Signed up successfully", { type: "success" });
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
        <h1 className="text-info display-4 fw-bold">Sign Up</h1>
        <p className="fs-4">
          <FaUser /> Create Your Account
        </p>
        <Form onSubmit={handleLogin} className="d-grid gap-3">
          <Form.Control
            value={name}
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            value={email}
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </p>
          <Form.Control
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="info" disabled={loading}>
            {loading ? <Spinner /> : "Sign up"}
          </Button>
        </Form>
        <p className="mt-3">
          Already have an account?{" "}
          <span className="text-info">
            <Link to="/login">Sign in</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Register;
