import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div className="nav-wrapper #1976d2 blue darken-2">
        <div className="container">
          <Link to="/" className="brand-logo left">
            Flipkart
          </Link>
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
