import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import BackgroundImage from "../Images/BackgroundImage.png";
import Icon from "../Images/Icon.png";
import Login from "./Login";

const Register = () => {
  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src={Logo} className="logo-image" alt="Logo" />
          <img src={Skinspect} className="logo-text" alt="Skinspect" />
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="#">Features</Link>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
            <li>
              <Link to="#">Blog</Link>
            </li>
            <li>
              <Link to="#">FAQ</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="login-container">
        {/* Left Half */}
        <div className="login-left">
          <img
            src={BackgroundImage}
            className="background-image"
            alt="Background"
          />
          <div className="icon-container">
            <img src={Icon} className="icon-image" alt="Icon" />
          </div>
        </div>

        {/* Right Half */}
        <div className="login-right">
          <h3>Hello Again!</h3>
          <p>Signup to get Started</p>
          <form className="login-form">
            <div className="form-group">
              <input type="password" placeholder="Full Name" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Confirm Password" />
            </div>
            <button className="login-button" type="submit">
              Register
            </button>
          </form>

          {/* Centered Social Icons and Forgot Password */}
          <div className="centered-container">
            <div className="social-icons">
              <i className="fab fa-google google-icon"></i>
              <i className="fab fa-facebook-f facebook-icon"></i>
            </div>
            <Link to="/login" className="forgot-password">Already have an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
