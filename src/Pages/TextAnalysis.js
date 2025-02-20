import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import BackgroundImage from "../Images/BackgroundImage.png";
import Icon from "../Images/Icon.png";

const TextAnalysis = () => {
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
              <Link to="/" className="text-blue-500 text-2xl">
                Home
              </Link>
            </li>
            <li>
              <Link to="/features" className="text-blue-500 text-2xl">
                Features
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-500 text-2xl">
                About
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-blue-500 text-2xl">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-blue-500 text-2xl">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-blue-500 text-2xl">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <section
        className="main-content flex flex-col items-center justify-center min-h-screen p-8"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-6xl text-white font-semibold text-center mb-4">
          Symptom/Text Based Analysis
        </h2>
        <p className="text-center mb-6 text-white text-md">
          Mention the symptoms faced in the skin disease
        </p>

        <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-md p-2 bg-blue-500"
            />
            <select className="border rounded-md p-2 bg-blue-500 bg-blue-500">
              <option>Symptoms</option>
              {/* Add symptom options here */}
            </select>
            <select className="border rounded-md p-2">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 border rounded-md p-2">
                <input
                  type="text"
                  placeholder="Symptoms"
                  className="flex-grow border-none focus:outline-none"
                />
                <button>
                  <img src={Icon} alt="Remove" className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 border rounded-md p-2">
                <input
                  type="text"
                  placeholder="Symptoms"
                  className="flex-grow border-none focus:outline-none"
                />
                <button>
                  <img src={Icon} alt="Remove" className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 border rounded-md p-2">
                <input
                  type="text"
                  placeholder="Symptoms"
                  className="flex-grow border-none focus:outline-none"
                />
                <button>
                  <img src={Icon} alt="Remove" className="h-4 w-4" />
                </button>
              </div>
            </div>
            <input
              type="number"
              placeholder="Age"
              className="border rounded-md p-2"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>

          <p className="text-xs text-center mt-4">
            *You can select upto 3 symptoms only
            <br />
            **Make sure to enter your correct details in name, gender and age
            criteria for better results
          </p>
        </div>

        {/* Result Box */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 mt-8 w-full max-w-2xl text-center">
          <p className="font-bold text-lg mb-2">
            Result:{" "}
            <span className="bg-blue-100 border border-blue-300 rounded-md px-2 py-1 text-blue-500">
              Name of the disease
            </span>
          </p>
          <a href="#" className="text-blue-500 underline block mt-2">
            Nearby doctor recommendation??
          </a>
        </div>
      </section>
    </div>
  );
};

export default TextAnalysis;