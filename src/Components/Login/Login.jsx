import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Login() {
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers =
      JSON.parse(localStorage.getItem("User_Reg_Data")) || [];

    const user = existingUsers.find(
      (user) => user.Username === formData.Username
    );

    if (!user) {
      setError("incorrect username");
      return;
    }

    if (user.Password !== formData.Password) {
      setError("incorrect password");
      return;
    }

    localStorage.setItem("login", JSON.stringify({ username: user.Username }));
    setError("");
    navigate("/");
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Butter - Login</title>
          <meta
            name="description"
            content="here you can login to be able to use more features"
          />
        </Helmet>
      </HelmetProvider>
      <div className="container-fluid">
        <div className="header row">
          <div className="left col-10">
            <h2>log in</h2>
            <h6>use your account</h6>
          </div>
        </div>
      </div>
      <div className="login">
        <div className="container-fluid">
          <form className="loginform row" onSubmit={handleSubmit}>
            <h4>login form</h4>
            <div className="input-container col-10">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                name="Username"
                placeholder="username"
                id="login_username"
                value={formData.Username}
                onChange={handleChange}
              />
            </div>
            <div className="input-container col-10">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                name="Password"
                placeholder="password"
                id="login_password"
                value={formData.Password}
                onChange={handleChange}
              />
            </div>
            <p className="error">{error}</p>
            <div className="loginBtn col-10">
              <button>login</button>
            </div>
            <p>
              new user? <Link to={"/Register"}>register</Link>
            </p>
          </form>
        </div>
      </div>
      <Link to={"/"} className="guestBtn">
        guest browsing
      </Link>
      <UpBtn />
    </>
  );
}
