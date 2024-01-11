import { Button, Container, Spinner } from "react-bootstrap";
import { FaCheck, FaConnectdevelop } from "react-icons/fa6";
import useFetch from "../Hooks/useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";

function Skills({ skills }) {
  const [showMore, setShowMore] = useState(false);

  function toggleShowMore() {
    setShowMore(!showMore);
  }

  return (
    <div className="w-25">
      <ul className="list-unstyled text-info fw-bold fs-5 d-grid gap-1">
        {skills.slice(0, showMore ? skills.length : 5).map((skill, index) => (
          <li key={skill + index}>
            <FaCheck /> {skill}
          </li>
        ))}
      </ul>
      {skills.length > 5 && (
        <Button variant="info" onClick={toggleShowMore}>
          {showMore ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}

const Developers = () => {
  const { data: profiles, isLoading, isFetched } = useFetch("/profile");

  return (
    <section className="my-3">
      <Container>
        <h1 className="text-info display-4 fw-bold">Developers</h1>
        <p className="fs-4">
          <FaConnectdevelop /> Browse and connect with developers
        </p>
        {isLoading ? (
          <Spinner />
        ) : (
          isFetched &&
          (profiles?.length > 0 ? (
            <ul className="list-group">
              {profiles.map((profile) => (
                <li
                  className="list-group-item d-flex gap-3 align-items-center"
                  key={profile._id}
                >
                  <img
                    width={125}
                    height={125}
                    className="rounded-circle"
                    src={profile.user.avatar}
                    alt={`${profile.user.name}'s avatar`}
                  />
                  <div className="flex-fill">
                    <h4>{profile.user.name}</h4>
                    <p>
                      {profile.status}{" "}
                      {profile.company && `at ${profile.company}`}
                    </p>
                    <p>{profile.location}</p>
                    <Button
                      as={Link}
                      to={`/profiles/${profile._id}`}
                      variant="info"
                    >
                      View profile
                    </Button>
                  </div>
                  <Skills skills={profile.skills} />
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p className="fs-4">
                Be the first person to{" "}
                <Link to="/create-profile">Create a profile</Link>
              </p>
            </div>
          ))
        )}
      </Container>
    </section>
  );
};

export default Developers;
