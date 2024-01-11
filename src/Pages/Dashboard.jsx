import { Spinner } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: profile, isLoading } = useFetch("/profile/me");

  return isLoading ? (
    <Spinner />
  ) : profile ? (
    <div>Dashboard</div>
  ) : (
    <>
      <p>You have not yet setup a profile, please add some info</p>
      <Link to="/create-profile" className="btn btn-primary my-1">
        Create Profile
      </Link>
    </>
  );
};

export default Dashboard;
