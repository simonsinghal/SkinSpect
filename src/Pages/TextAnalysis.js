import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import BackgroundImage from "../Images/BackgroundImage.png";
import Icon from "../Images/Icon.png";
import cross from "../Images/cross.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const TextAnalysis = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomOptions, setSymptomOptions] = useState([
    "Pimples", "Blackheads", "Whiteheads", "Pustules", "Cysts",
    "Rough Skin", "Scaly Patches", "Itching", "Burning", "Cracked Skin",
    "Inflamed Skin", "Oozing", "Thickened Skin", "Blisters", "Redness",
    "Swelling", "Pain", "Oozing.1", "Warmth", "Fever", "Dryness", "Scaling",
    "Hives", "Ulcers", "Fatigue", "Joint Pain", "Hair Loss", "Asymmetry",
    "Irregular Color", "Diameter Changes", "Evolving", "Rash", "Pitting",
    "Joint Issues", "Growth", "Lump", "Color Change", "Circular Rash",
    "Raised Skin", "Clearing", "Welts", "Blanching", "Red", "Purple",
    "Varied Growth"
  ]);
  const [prediction, setPrediction] = useState("Waiting for Submission..."); // Initial state
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleSymptomSelect = (event) => {
    const symptom = event.target.value;
    if (
      symptom &&
      selectedSymptoms.length < 5 &&
      !selectedSymptoms.includes(symptom)
    ) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const fetchPrediction = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict');
      const data = await response.json();
      setPrediction(data.prediction);
      console.log('Prediction data:', data);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPrediction("Error fetching prediction");
    }
  };

  // Removed the initial fetchPrediction in useEffect
  // useEffect(() => {
  //   fetchPrediction();
  // }, []);

  const handleRemoveSymptom = (symptomToRemove) => {
    setSelectedSymptoms(
      selectedSymptoms.filter((symptom) => symptom !== symptomToRemove)
    );
  };

  const handleSubmit = async () => {
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

    console.log("Form Data:", {
      fullName,
      gender,
      age,
      symptoms: selectedSymptoms,
      userId: userId,
    });

    if (!fullName || !gender || !age || selectedSymptoms.length === 0) {
      alert("Please fill in all fields and select at least one symptom.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/submit-text-analysis",
        {
          fullName,
          gender,
          age,
          symptoms: selectedSymptoms,
          userId: userId,
        }
      );

      console.log("Response:", response.data);

      if (response.data.message === "Data saved successfully") {
        alert("Submission successful!");
        // Record activity log for text analysis
        try {
          await axios.post("http://localhost:5000/api/activity-log", {
            userId: userId,
            activityType: "Text Analysis Submitted",
            details: {
              fullName: fullName,
              gender: gender,
              age: age,
              symptoms: selectedSymptoms,
            },
          });
          console.log("Activity log recorded for text analysis.");
        } catch (activityLogError) {
          console.error("Error recording activity log:", activityLogError); // Optionally handle this error
        }

        setFullName("");
        setGender("");
        setAge("");
        setSelectedSymptoms([]);

        // Fetch the prediction again after successful submission
        fetchPrediction();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="font-montserrat">
      {/* Navbar */}
      <header className="navbar flex h-24 items-center px-20 bg-gray-100 shadow-md top-0 z-1000 w-full">
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

        {/* Symptom Box */}
        <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border rounded-md p-2 bg-blue-500 text-white placeholder-white"
            />
            <select
              className="border rounded-md p-2 bg-blue-500 text-white"
              onChange={handleSymptomSelect}
            >
              <option value="">Symptoms</option>
              {symptomOptions.map((symptom, index) => (
                <option key={index} value={symptom}>
                  {symptom}
                </option>
              ))}
            </select>
            <select
              className="border rounded-md p-2 bg-blue-500 text-white"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {/* Constrained height and scrolling for selected symptoms */}
            <div className="border rounded-md p-2 bg-blue-100 max-h-14 overflow-y-auto">
              {selectedSymptoms.map((symptom, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 border rounded-md p-2 bg-white mb-2"
                >
                  <span className="flex-grow">{symptom}</span>
                  <button onClick={() => handleRemoveSymptom(symptom)}>
                    <img src={cross} alt="Remove" className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border rounded-md p-2 bg-blue-500 text-white placeholder-white"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <p className="text-xs text-center mt-4">
            *You can select upto 5 symptoms only
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
              {prediction}
            </span>
          </p>
          <a href="./findDoctor" className="text-blue-500 underline block mt-2">
            Nearby doctor recommendation??
          </a>
        </div>
      </section>
    </div>
  );
};

export default TextAnalysis;