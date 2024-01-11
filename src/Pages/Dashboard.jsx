import { Spinner } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";

const Dashboard = () => {
  const { data: profile, isLoading } = useFetch("/profile/me");

  return isLoading ? (
    <Spinner />
  ) : profile ? (
    <div className="container">Dashboard</div>
  ) : (
    <div className="container mt-5">
      <h1 className="text-info display-4 fw-bold">Dashboard</h1>
      <p className="fs-4">
        <FaUser /> Welcome to the community
      </p>
      <p>You have not yet setup a profile, please add some info</p>
      <Link to="/create-profile" className="btn btn-primary my-1">
        Create Profile
      </Link>
    </div>
  );
};

export default Dashboard;
