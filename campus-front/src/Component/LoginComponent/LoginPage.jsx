import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";
import { FaUser, FaLock } from "react-icons/fa";
import "../../LoginView.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkLogin = (e) => {
    e.preventDefault();
    validateUser(formData.username, formData.password).then((response) => {
      let role = String(response.data);
      if (role === "Admin") navigate("/AdminMenu");
      else if (role === "Student") navigate("/StudentMenu");
      else alert("Wrong Userid/Password");
    });
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }
    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) checkLogin(e);
  };

  return (
    <div className="loginpage d-flex justify-content-center align-items-center">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="/videos/bg-dark-loop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="glass-card p-5">
        <h2 className="text-center mb-2">Welcome Back</h2>
        <p className="text-center tagline">Access the Lost & Found Portal</p>

        <form onSubmit={handleValidation}>
          <div className="form-group">
            <div className={`icon-input ${errors.username ? "has-error" : ""}`}>
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={onChangeHandler}
                className="form-control"
              />
            </div>
            {errors.username && <p className="error-msg">{errors.username}</p>}
          </div>

          <div className="form-group">
            <div className={`icon-input ${errors.password ? "has-error" : ""}`}>
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={onChangeHandler}
                className="form-control"
              />
            </div>
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-gradient-primary w-100 mt-3">
            Login →
          </button>
        </form>

        <p className="bottom-link text-center mt-3">
          First time to this page?{" "}
          <a onClick={() => navigate("/Register")}>Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
