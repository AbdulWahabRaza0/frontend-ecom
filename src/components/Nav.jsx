import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };
  return (
    <nav>
      <div className="nav-wrapper #1976d2 blue darken-2">
        <div className="container">
          <Link to="/" className="brand-logo left">
            Flipkart
          </Link>
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/cart">
                <i
                  style={{ padding: "0px 20px" }}
                  className="material-icons large #0d47a1 blue darken-4
"
                >
                  add_shopping_cart
                </i>
              </Link>
            </li>
            {jwt ? (
              <>
                {" "}
                <li>
                  <i
                    onClick={logout}
                    style={{ padding: "0px 20px" }}
                    className="material-icons large red"
                  >
                    logout
                  </i>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
