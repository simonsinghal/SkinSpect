import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import Icon from "../Images/Icon.png";
import Facebook from "../Images/Facebook.png";
import Google from "../Images/Google.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration submitted:", { email, password });
    navigate("/login");
  };

  return (
    <div className="font-montserrat min-h-screen flex flex-col">
      {" "}
      {/* Corrected: min-h-screen and flex flex-col on outer div */}
      <header className="navbar flex h-24 items-center px-20 bg-gray-100 shadow-md sticky top-0 z-1000 w-full">
        <div className="logo flex items-center h-full">
          <img src={Logo} className="logo-image h-16 mr-3" alt="Logo" />
          <img src={Skinspect} className="logo-text h-9" alt="Skinspect" />
        </div>
        <nav className="ml-auto h-full flex items-center">
          <ul className="nav-links flex items-center gap-8 font-poppins text-base font-medium h-full">
            <li>
              <Link to="/" className="text-blue-500 text-2xl" >Home</Link>
            </li>
            <li>
              <Link to="/features" className="text-blue-500 text-2xl ">Features</Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-500 text-2xl ">About</Link>
            </li>
            <li>
              <Link to="/blog" className="text-blue-500 text-2xl ">Blog</Link>
            </li>
            <li>
              <Link to="/faq" className="text-blue-500 text-2xl ">FAQ</Link>
            </li>
            <li>
              <Link to="/login" className="text-blue-500 text-2xl ">Login</Link>
            </li>
            <li>
              <Link to="/register" className="text-blue-500 text-2xl">Register</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="login-container flex-grow flex">
        {" "}
        {/* Corrected: flex-grow on login-container */}
        <div className="login-left w-1/2 relative bg-gradient-to-b from-[#0575E6] via-[#02298A] to-[#021B79]">
          <div className="icon-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <img src={Icon} className="icon-image w-80 h-80" alt="Icon" />
          </div>
        </div>
        <div className="login-right w-1/2 flex flex-col justify-center px-20 overflow-y-auto">
          {" "}
          {/* Corrected: overflow-y-auto on login-right */}
          <h3 className="text-3xl font-bold mb-2">Hello!</h3>
          <p className="text-xl text-gray-600 mb-6">Welcome Back</p>
          <form className="login-form w-3/4" onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-xl text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-xl text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-start w-full">
              {" "}
              {/* Added w-full */}
              <button
                className="login-button w-2/3 py-2 bg-[#1e54dc] text-white rounded-xl text-lg hover:bg-[#0056b3] transition duration-300"
                type="submit"
              >
                Login
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center w-2/3">
              <Link
                to="/login"
                className="forgot-password text-base underline text-[#02298A] hover:text-[#0056b3] transition duration-300 mb-4 text-center"
              >
                Forgot Password
              </Link>
              <div className="social-icons flex justify-center gap-4">
                <Link to="/auth/google">
                  <img
                    src={Google}
                    className="google w-12 h-12"
                    alt="Google Icon"
                  />
                </Link>
                <Link to="/auth/facebook">
                  <img
                    src={Facebook}
                    className="facebook w-12 h-12"
                    alt="Facebook Icon"
                  />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
