import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import UploadIcon from "../Images/uploadIcon.png";
import BackgroundImage from "../Images/BackgroundImage.png";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const ImageAnalysisPage = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

// Handle image upload
const handleImageUpload = (event, setImage, setFile) => {
  const file = event.target.files[0];
  if (file) {
    setImage(URL.createObjectURL(file));
    setFile(file);
  }
};

// Handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();

  if (!file1 && !file2) {
    alert("Please upload at least one image.");
    return;
  }

  if (!fullName || !gender || !age) {
    alert("Please fill in all fields and provide image"); 
    return;
  }

  let userId = null;
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId || decodedToken.id || decodedToken._id;
      } catch (error) {
        console.error("Error decoding token:", error);
        alert("Authentication error. Please log in again.");
        return;
      }
    } else {
      alert("Please log in to submit data");
      return;
    }

  const formData = new FormData();
  if (file1) formData.append("image1", file1);
  if (file2) formData.append("image2", file2);
  formData.append("fullName", fullName); 
  formData.append("gender", gender);
  formData.append("age", age);
  formData.append("userId", userId); 

  console.log("[handleSubmit] Starting upload process...");
  console.log("[handleSubmit] FormData contents:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/upload", 
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response.data.message === 'Files uploaded successfully') { // Changed to check for message
      alert("Upload successful!");
      // Optionally reset the form here
      setImage1(null);
      setImage2(null);
      setFile1(null);
      setFile2(null);
      setFullName("");
      setGender("");
      setAge("");
    } else {
      alert("Upload failed.  Server Response: " + response.data.message); // Display server message
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("Error uploading. Check console.  " + error.message); // include error message
  }
};


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
      <div className="relative flex w-full font-montserrat">
        {/* Model 1 (Left Half) */}
        <div className="w-1/2 bg-white p-8 h-full">
          <div className="mb-8 ml-8">
            <h2 className="text-5xl text-blue-500 font-bold mb-4">Model 1</h2>
            <p className="text-gray-500 font-bold">
              Use this model if facing <br /> problem less than 3 months
            </p>
          </div>

          {/* Image Upload Box */}
          <div className="bg-blue-600 rounded-3xl p-2 mb-4 mx-auto w-[400px] h-[350px] flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center w-[340px] h-[230px]">
              {image1 ? (
                <img
                  src={image1}
                  alt="Uploaded"
                  className="h-40 w-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <img
                    src={UploadIcon}
                    alt="Upload"
                    className="h-12 w-16 mb-2"
                  />
                  <p className="text-black mb-2 font-bold">Upload Image</p>
                  <p className="text-sm text-black">
                    Image size must be less than 5 MB
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="imageUpload1"
              onChange={(e) => handleImageUpload(e, setImage1, setFile1)} // Added setFile1
            />
            <button
              className="bg-white hover:bg-blue-300 text-blue-500 font-bold py-2 px-4 rounded mt-4 w-[338px]"
              onClick={() => document.getElementById("imageUpload1").click()}
            >
              Select Image
            </button>
          </div>

          {/* Form Inputs */}
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full mb-2 bg-blue-600 text-white placeholder-white"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full mb-2 bg-blue-600 text-white"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full bg-blue-600 text-white"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-12">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-[220px] rounded"
              onClick={handleSubmit}
            >
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

          {/* Image Upload Box */}
          <div className="bg-white rounded-3xl p-2 mb-4 mx-auto w-[400px] h-[350px] flex flex-col items-center justify-center">
            <div className="bg-blue-200 rounded-lg p-4 flex flex-col items-center justify-center w-[340px] h-[230px]">
              {image2 ? (
                <img
                  src={image2}
                  alt="Uploaded"
                  className="h-40 w-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <img
                    src={UploadIcon}
                    alt="Upload"
                    className="h-12 w-16 mb-2"
                  />
                  <p className="text-black mb-2 font-bold">Upload Image</p>
                  <p className="text-sm text-black">
                    Image size must be less than 5 MB
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="imageUpload2"
              onChange={(e) => handleImageUpload(e, setImage2, setFile2)} // Added setFile2
            />
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 w-[338px]"
              onClick={() => document.getElementById("imageUpload2").click()}
            >
              Select Image
            </button>
          </div>

          {/* Form Inputs */}
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full mb-2 bg-white text-gray-400"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full mb-2 bg-white text-gray-400"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full bg-white text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-12">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-[220px] rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysisPage;

