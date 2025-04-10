import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const loginData = localStorage.getItem("login");
  const username = loginData ? JSON.parse(loginData).username : null;

  const handleLogout = () => {
    localStorage.removeItem("login");
    navigate("/login");
  };
  return (
    <>
      <div className="outer">
        <div className="connection"></div>
        <div className="container">
          <div className="navbar row">
            <div className="logo col-1">
              <img src="/Images/logo.png" alt="Butter Logo" />
            </div>
            <div className="navigations row col-10">
              <ul className="nav-links col-7">
                <li className="link">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="link">
                  <Link to={"/shop"}>Shop</Link>
                </li>
                <li className="link">
                  <Link to={"/Reservations"}>Reservations</Link>
                </li>
                <li className="link">
                  <Link to={"/Gallery"}> Gallery</Link>
                </li>
                <li className="link">
                  <Link to={"/blog"}>Blog</Link>
                </li>
                <li className="link">
                  <Link to={"/login"}>log in / register</Link>
                </li>
              </ul>
              <div className="orders col-1">
                <Link to={"./orders"}>
                  <i className="fa-solid fa-mug-hot"></i>
                </Link>
              </div>
              <div className="user col-3">
                <span>{username ? `hello, ${username}` : "hello, guest"}</span>
                <i
                  onClick={handleLogout}
                  className="fa-solid fa-person-walking-arrow-right"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* offcanvas for smaller screens */}
      <a
        className="offCanTrigger btn"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        <i className="fa-solid fa-bars"></i>
      </a>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <span>{username ? `hello, ${username}` : "hello, guest"}</span>{" "}
          </h5>
          <button
            type="button"
            className="btnClose"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <ul className="navigationList">
            <li className="link">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="link">
              <Link to={"/shop"}>Shop</Link>
            </li>
            <li className="link">
              <Link to={"/Reservations"}>Reservations</Link>
            </li>
            <li className="link">
              <Link to={"/Gallery"}> Gallery</Link>
            </li>
            <li className="link">
              <Link to={"/blog"}>Blog</Link>
            </li>
            <li className="link">
              <Link to={"/login"}>log in / register</Link>
            </li>
            <li className="link">
              <Link to={"./orders"}>orders</Link>
            </li>
          </ul>
          <div className="midPart">
            <h3>about company</h3>
            <p>
              {" "}
              Pellentesque mi purus, eleifend sedt commodo vel, sagittis elts
              vestibulum dui sagittis mlste sagittis elts.
            </p>
            <ul>
              <li>
                <i className="fa-solid fa-location-dot"></i>15 Barnes Wallis
                Way, 358744, USA
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>+1 (012) 345 6789
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>nfo@yourdomain.com
              </li>
            </ul>
          </div>
          <div className="bottomBanner row">
            <div className="socials col-8">
              <Link to={"/blog"}>
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link to={"/blog"}>
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link to={"/blog"}>
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </div>
            <div className="logout col-3">
              <i
                onClick={handleLogout}
                className="fa-solid fa-person-walking-arrow-right"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
