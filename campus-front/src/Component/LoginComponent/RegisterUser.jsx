import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../Services/LoginService";
import { FaUser, FaLock, FaEnvelope, FaUserShield } from "react-icons/fa";
import "../../LoginView.css";

const RegisterUser = () => {
  const [campusUser, setCampusUser] = useState({
    username: "",
    password: "",
    personName: "",
    email: "",
    role: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCampusUser((prev) => ({ ...prev, [name]: value }));
  };

  const saveUser = async () => {
    await registerNewUser(campusUser);
    alert("User is registered successfully...Go For Login");
    navigate("/");
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!campusUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }
    if (!campusUser.personName.trim()) {
      tempErrors.personName = "Full Name is required";
      isValid = false;
    }
    if (!campusUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (
      campusUser.password.length < 5 ||
      campusUser.password.length > 10
    ) {
      tempErrors.password = "Password must be 5-10 characters long";
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (campusUser.password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (!campusUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campusUser.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!campusUser.role.trim()) {
      tempErrors.role = "Role is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) saveUser();
  };

  return (
    <div className="registerUser d-flex justify-content-center align-items-center">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="/videos/bg-dark-loop.mp4" type="video/mp4" />
      </video>

      <div className="glass-card p-5">
        <h2 className="text-center mb-2">Join Us Now</h2>
        <p className="text-center tagline">Create your account to access</p>

        <form onSubmit={handleValidation}>
          <div className="row">
            <div className="col-md-6 form-group">
              <div
                className={`icon-input ${errors.username ? "has-error" : ""}`}
              >
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={campusUser.username}
                  onChange={onChangeHandler}
                  className="form-control"
                />
              </div>
              {errors.username && (
                <p className="error-msg">{errors.username}</p>
              )}
            </div>
            <div className="col-md-6 form-group">
              <div
                className={`icon-input ${errors.personName ? "has-error" : ""}`}
              >
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="personName"
                  placeholder="Full Name"
                  value={campusUser.personName}
                  onChange={onChangeHandler}
                  className="form-control"
                />
              </div>
              {errors.personName && (
                <p className="error-msg">{errors.personName}</p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <div
                className={`icon-input ${errors.password ? "has-error" : ""}`}
              >
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={campusUser.password}
                  onChange={onChangeHandler}
                  className="form-control"
                />
              </div>
              {errors.password && (
                <p className="error-msg">{errors.password}</p>
              )}
            </div>
            <div className="col-md-6 form-group">
              <div
                className={`icon-input ${
                  errors.confirmPassword ? "has-error" : ""
                }`}
              >
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              {errors.confirmPassword && (
                <p className="error-msg">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <div
              className={`icon-input email ${errors.email ? "has-error" : ""}`}
            >
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="User Email"
                value={campusUser.email}
                onChange={onChangeHandler}
                className="form-control"
              />
            </div>
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <div className={`icon-input ${errors.role ? "has-error" : ""}`}>
                <FaUserShield className="input-icon" />
                <input
                  list="roles"
                  name="role"
                  placeholder="Select Role"
                  value={campusUser.role}
                  onChange={onChangeHandler}
                  className="form-control"
                />
                <datalist id="roles">
                  <option value="Student" />
                  <option value="Admin" />
                </datalist>
              </div>
              {errors.role && <p className="error-msg">{errors.role}</p>}
            </div>

            <div className="col-md-6">
              <button type="submit" className="btn btn-gradient-success w-100">
                Create Account →
              </button>
            </div>
          </div>
        </form>

        <p className="bottom-link text-center mt-3">
          Already have an account? <a onClick={() => navigate("/")}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
