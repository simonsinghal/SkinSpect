import React, { useState, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import UploadIcon from "../Images/uploadIcon.png";
import BackgroundImage from "../Images/BackgroundImage.png";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from "../authContext";

const ImageAnalysisPage = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the home page after logout
  };

// Model 1 states
  const [image1, setImage1] = useState(null);
  const [file1, setFile1] = useState(null);
  const [fullName1, setFullName1] = useState("");
  const [gender1, setGender1] = useState("");
  const [age1, setAge1] = useState("");
  const [prediction1, setPrediction1] = useState("Waiting for Submission...");

  // Model 2 states
  const [image2, setImage2] = useState(null);
  const [file2, setFile2] = useState(null);
  const [fullName2, setFullName2] = useState("");
  const [gender2, setGender2] = useState("");
  const [age2, setAge2] = useState("");
  const [prediction2, setPrediction2] = useState("Waiting for Submission...");



// Handle image upload
const handleImageUpload = (event, setImage, setFile) => {
  const file = event.target.files[0];
  if (file) {
    setImage(URL.createObjectURL(file));
    setFile(file);
  }
};

//handle submit for model 1
const handleSubmitModel1 = async (event) => {
    event.preventDefault();

    if (!file1) {
      alert("Please upload an image for Model 1.");
      return;
    }
    if (!fullName1 || !gender1 || !age1) {
      alert("Please fill all fields for Model 1.");
      return;
    }

    // User ID extraction same as before...
    let userId = null;
    const token = localStorage.getItem("token");

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
    formData.append("image1", file1);
    formData.append("name", fullName1);
    formData.append("gender", gender1);
    formData.append("age", age1);
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Log activity
      try {
        await axios.post("http://localhost:5000/api/activity-log", {
          userId: userId,
          activityType: "Image Analysis Submitted - Model 1",
          details: {
            fullName: fullName1,
            gender: gender1,
            age: age1,
            image1: file1.name,
          },
        });
        console.log("Activity log recorded for Model 1.");
      } catch (err) {
        console.error("Error recording activity log:", err);
      }

      if (response.data.message === "Files uploaded successfully") {
        alert("Upload successful for Model 1!");
        // Reset form
        setImage1(null);
        setFile1(null);
        setFullName1("");
        setGender1("");
        setAge1("");
        setPrediction1("Waiting for Submission...");
      } else {
        alert("Upload failed for Model 1: " + response.data.message);
      }
    } catch (error) {
      console.error("Upload error Model 1:", error);
      alert("Error uploading Model 1 data. " + error.message);
    }
  };

//handle submit for model 2
const handleSubmitModel2 = async (event) => {
    event.preventDefault();

    if (!file2) {
      alert("Please upload an image for Model 2.");
      return;
    }
    if (!fullName2 || !gender2 || !age2) {
      alert("Please fill all fields for Model 2.");
      return;
    }

    let userId = null;
    const token = localStorage.getItem("token");

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
    formData.append("image2", file2);
    formData.append("name", fullName2);
    formData.append("gender", gender2);
    formData.append("age", age2);
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Log activity
      try {
        await axios.post("http://localhost:5000/api/activity-log", {
          userId: userId,
          activityType: "Image Analysis Submitted - Model 2",
          details: {
            fullName: fullName2,
            gender: gender2,
            age: age2,
            image2: file2.name,
          },
        });
        console.log("Activity log recorded for Model 2.");
      } catch (err) {
        console.error("Error recording activity log:", err);
      }

      if (response.data.message === "Files uploaded successfully") {
        alert("Upload successful for Model 2!");
        // Reset form
        setImage2(null);
        setFile2(null);
        setFullName2("");
        setGender2("");
        setAge2("");
        setPrediction2("Waiting for Submission...");
      } else {
        alert("Upload failed for Model 2: " + response.data.message);
      }
    } catch (error) {
      console.error("Upload error Model 2:", error);
      alert("Error uploading Model 2 data. " + error.message);
    }
  };


return (
  <div className="font-montserrat">
    {/* Navbar */}
    <header className="navbar flex h-24 items-center px-20 bg-gray-100 shadow-md top-0 z-1000 w-full">
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
            {currentUser ? (
              <>
                <li>
                  <Link to="/dashboard" className="text-blue-500 text-2xl">
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-blue-500 text-2xl"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
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
                  <p className="text-sm text-black">Image size must be less than 5 MB</p>
                </>
              )}
            </div>
                        <input
              type="file"
              accept="image/*"
              className="hidden"
              id="imageUpload1"
              onChange={(e) => handleImageUpload(e, setImage1, setFile1)}
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
              value={fullName1}
              onChange={(e) => setFullName1(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full mb-2 bg-blue-600 text-white placeholder-white"
            />
            <select
              value={gender1}
              onChange={(e) => setGender1(e.target.value)}
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
              value={age1}
              onChange={(e) => setAge1(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full bg-blue-600 text-white"
            />
          </div>

        {/* Submit Button */}
          <div className="flex justify-center mt-12">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-[220px] rounded"
              onClick={handleSubmitModel1}
            >
              Submit
            </button>
          </div>

        {/* Result Box for Model 1 */}
          {prediction1 && (
            <div className="bg-white border border-gray-300 rounded-lg p-4 mt-8 w-full max-w-md mx-auto text-center">
              <p className="font-bold text-lg mb-2">
                Result:{" "}
                <span className="bg-blue-100 border border-blue-300 rounded-md px-2 py-1 text-blue-500">
                  {prediction1}
                </span>
              </p>
            </div>
          )}
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
              value={fullName2}
              onChange={(e) => setFullName2(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full mb-2 bg-white text-gray-600 placeholder-gray"
            />
            <select
              value={gender2}
              onChange={(e) => setGender2(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full mb-2 bg-white text-gray-600 placeholder-gray"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Age"
              value={age2}
              onChange={(e) => setAge2(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full bg-white text-gray-600 placeholder-gray"
            />
          </div>

        {/* Submit Button */}
          <div className="flex justify-center mt-12">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-[220px] rounded"
              onClick={handleSubmitModel2}
            >
              Submit
            </button>
          </div>

        {/* Result Box for Model 2 */}
          {prediction2 && (
            <div className="bg-white border border-gray-300 rounded-lg p-4 mt-8 w-full max-w-md mx-auto text-center">
              <p className="font-bold text-lg mb-2">
                Result:{" "}
                <span className="bg-blue-100 border border-blue-300 rounded-md px-2 py-1 text-blue-500">
                  {prediction2}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
);
};

export default ImageAnalysisPage;
