import React from "react";
import { Link } from "react-router-dom";
import Skinspect from "../Images/Skinspect.png";
import BackgroundImage from "../Images/BackgroundImage.png";
import Icon from "../Images/Icon.png";
import Logo from "../Images/Logo.png";

const Home = () => {
  return (
    <div className="font-montserrat">
      {/* Navbar */}
      <header className="navbar flex h-24 items-center px-20 bg-gray-100 shadow-md sticky top-0 z-1000 w-full">
        <div className="logo flex items-center h-100">
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

      {/* Main Content Section */}
      <section
        className="main-content flex justify-center items-center h-screen"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content-wrapper text-center text-white">
          <img
            src={Icon}
            className="icon-image h-[300px] mx-auto mb-4 relative bottom-12"
            alt="Icon"
          />{" "}
          {/* mx-auto for centering */}
          <h2 className="heading text-4xl mb-2 font-bold">
            YOUR SKIN HEALTH SIMPLIFIED WITH AI
          </h2>
          <p className="text-xl mb-6">
            24/7 Online Skin Disease Analysis By Uploading Image File, Audio
            File and Prescription
          </p>
          <button className="cta-button bg-[#3363de] text-white py-2 px-6 rounded-lg text-lg font-montserrat hover:bg-[#0056b3] transition duration-300 shadow-md hover:shadow-lg">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
