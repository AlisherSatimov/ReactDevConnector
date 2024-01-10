import { Spinner } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: profile, isLoading } = useFetch("/profile/me");

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome
      </p>
      {profile == null ? (
        <>
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

export default Dashboard;
