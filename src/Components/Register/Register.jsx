import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const schema = Joi.object({
    fullName: Joi.string()
      .pattern(/^[a-zA-Z]{1}[a-zA-Z ]{4,19}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Full name must be 5-20 letters long and contain no numbers or special characters.",
        "string.empty": "Full name is required.",
      }),
    username: Joi.string()
      .pattern(/^[a-zA-Z]{1}[a-zA-Z0-9!@#$%^&*()_+=-]{4,19}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Username must be 5-20 characters long and can include numbers or special characters.",
        "string.empty": "Username is required.",
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Invalid email format.",
        "string.empty": "Email is required.",
      }),
    password: Joi.string()
      .pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()_+=-]{5,20}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must be 5-20 characters long and include at least one number.",
        "string.empty": "Password is required.",
      }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error: validationError } = schema.validate(formData, {
        abortEarly: false,
      });

      if (validationError) {
        setError(validationError.details[0].message);
        return;
      }

      const existingUsers =
        JSON.parse(localStorage.getItem("User_Reg_Data")) || [];

      const isUsernameTaken = existingUsers.some(
        (user) =>
          user.username.toLowerCase() === formData.username.toLowerCase()
      );
      const isEmailUsed = existingUsers.some(
        (user) => user.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (isUsernameTaken) {
        setError("Username already taken");
        return;
      }

      if (isEmailUsed) {
        setError("Email is already used");
        return;
      }

      const updatedUsers = [...existingUsers, formData];
      localStorage.setItem("User_Reg_Data", JSON.stringify(updatedUsers));

      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Butter - Register</title>
        <meta name="description" content="Welcome to Butter, new user?" />
      </Helmet>
      <main className="register-container">
        <div className="container-fluid">
          <header className="header row">
            <div className="left col-12">
              <h1>Welcome</h1>
              <h2>New user?</h2>
            </div>
          </header>
        </div>
        <div className="register">
          <div className="container">
            <form
              className="registerform row"
              onSubmit={handleSubmit}
              noValidate
            >
              <h3>Register Form</h3>
              <div className="input-container col-10">
                <i className="fa-solid fa-user" aria-hidden="true"></i>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  id="reg_name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="input-container col-10">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="input-container col-10">
                <i className="fa-solid fa-user" aria-hidden="true"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  id="reg_username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="input-container col-10">
                <i className="fa-solid fa-lock" aria-hidden="true"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="reg_password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              <div className="regBtn col-10">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing up..." : "Sign up"}
                </button>
              </div>
              <p>
                Already a user? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
        <Link to="/" className="guestBtn">
          Continue as Guest
        </Link>
      </main>
    </HelmetProvider>
  );
}
