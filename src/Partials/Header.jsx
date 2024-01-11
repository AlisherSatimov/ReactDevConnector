import Link from "../Components/Link";
import { FaArrowRightFromBracket, FaCode } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { localTokenKey } from "../constants";
import { removeUser } from "../Store/Slices/user";
import { useNavigate } from "react-router-dom";
import Avatar from "../Components/Avatar";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem(localTokenKey);
    dispatch(removeUser());
    navigate("/login");
  }

  return (
    <header className="py-3 text-bg-secondary sticky-top border-bottom border-info border-3">
      <nav className="container d-flex align-items-center justify-content-between">
        <Link className={"fs-3"} to="/">
          <FaCode /> DevConnector
        </Link>
        <ul className="list-unstyled d-flex m-0 gap-3">
          <li>
            <Link to="/profiles">Developers</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <Avatar letter={user.name[0]} bg={"light"} /> Dashboard
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout} to="#">
                  <FaArrowRightFromBracket /> Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
