import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import UploadIcon from "../Images/uploadIcon.png";
import BackgroundImage from "../Images/BackgroundImage.png";

const ImageAnalysisPage = () => {
  return (
    <div className="font-montserrat">
      {/* Navbar */}
      <header className="navbar flex h-24 items-center px-20 bg-gray-100 shadow-md sticky top-0 z-1000 w-full">
        <div className="logo flex items-center h-full">
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

      {/* Main Content */}
      <div className=" relative flex w-full font-montserrat">
        {/* Model 1 (Left Half) */}
        <div className="w-1/2 bg-white p-8 h-full">
          <div className="mb-8 ml-8">
            <h2 className="text-5xl text-blue-500 font-bold mb-4">Model 1</h2>
            <p className="text-gray-500 font-bold">
              Use this model if facing <br /> problem less than 3 months
            </p>
          </div>

          {/* Double Layer Box with Content */}
          <div
            className="bg-blue-600 rounded-3xl p-2 mb-4 mx-auto"
            style={{
              width: "400px",
              height: "350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="bg-white rounded-lg p-4 flex flex-col items-center justify-center"
              style={{ width: "340px", height: "230px" }}
            >
              <img src={UploadIcon} alt="Upload" className="h-12 w-16 mb-2" />
              <p className="text-black mb-2 font-bold">Upload Image</p>
              <p className="text-sm text-black">
                Image size must be less than 5 MB
              </p>
            </div>
            <button className="bg-white hover:bg-blue-300 text-blue-500 font-bold py-2 px-4 rounded mt-4 w-[338px]">
              Select Image
            </button>
          </div>

          {/* Form Inputs */}
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-2 rounded-lg w-full mb-2 bg-blue-600 text-white placeholder-white"
              style={{ maxWidth: "400px" }}
            />
            <select
              className="border border-gray-300 p-2 rounded-lg w-full mb-2 bg-blue-600 text-white placeholder-white"
              style={{ maxWidth: "400px" }}
            >
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              type="number"
              placeholder="Age"
              className="border border-gray-300 p-2 rounded-lg w-full bg-blue-600 text-white placeholder-white"
              style={{ maxWidth: "400px" }}
            />
          </div>

          {/*Submit Button  */}
          <div className="flex justify-center mt-12">
            {" "}
            {/* Added flex justify-center */}
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-[220px] rounded">
              Submit
            </button>
          </div>
        </div>

        {/* Model 2 (Right Half) */}
        <div
          className="w-1/2 bg-white p-8 h-[950px]"
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mb-8 mr-8">
            <h2 className="text-5xl text-white font-bold mb-4 text-end">
              Model 2
            </h2>
            <p className="text-white font-bold text-end">
              Use this model if facing <br /> problem for more than 3 months
            </p>
          </div>

          {/* Double Layer Box with Content */}
          <div
            className="bg-white rounded-3xl p-2 mb-4 mx-auto"
            style={{
              width: "400px",
              height: "350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="bg-blue-200 rounded-lg p-4 flex flex-col items-center justify-center"
              style={{ width: "340px", height: "230px" }}
            >
              <img src={UploadIcon} alt="Upload" className="h-12 w-16 mb-2" />
              <p className="text-black mb-2 font-bold">Upload Image</p>
              <p className="text-sm text-black">
                Image size must be less than 5 MB
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 w-[338px]">
              Select Image
            </button>
          </div>

          {/* Form Inputs */}
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-2 rounded-lg w-full mb-2 bg-white text-gray-400"
              style={{ maxWidth: "400px" }}
            />
            <select
              className="border border-gray-300 p-2 rounded-lg w-full mb-2 bg-white text-gray-400"
              style={{ maxWidth: "400px" }}
            >
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              type="number"
              placeholder="Age"
              className="border border-gray-300 p-2 rounded-lg w-full bg-white text-gray-400"
              style={{ maxWidth: "400px" }}
            />
          </div>
          {/*Submit Button  */}
          <div className="flex justify-center mt-12">
            {" "}
            {/* Added flex justify-center */}
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-[220px] rounded">
              Submit
            </button>
            {/* Result Box */}
            <div
              className="absolute left-1/2 bottom-[30px] transform -translate-x-1/2 
    bg-white border border-blue-700 rounded-lg p-4 shadow-lg z-10
    w-[90%] max-w-xs sm:max-w-md md:max-w-lg"
            >
              <p className="font-bold text-lg mb-2 text-center">
                Result:{" "}
                <span className="bg-white border border-blue-300 rounded-2xl px-2 py-1 text-blue-500">
                  Name of the disease
                </span>
              </p>
              <a href="#" className="text-blue-500 underline block text-center">
                Nearby doctor recommendation??
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysisPage;
