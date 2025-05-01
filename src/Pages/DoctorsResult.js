import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import BackgroundImage from "../Images/BackgroundImage.png";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const DoctorsResult = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // Default: Delhi
  const apiKey = "AIzaSyDFegYSgswTpugFmkXgmlQM1VnUkPzNsyE"; // Replace with actual key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationData = JSON.parse(localStorage.getItem("findDoctorLocation"));
        const response = await fetch("http://localhost:5000/api/doctors/nearby", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(locationData),
        });
  
        const data = await response.json();
        console.log("Fetched doctor data:", data);
  
        let doctorsArray = [];
  
        if (Array.isArray(data)) {
          doctorsArray = data;
        } else if (Array.isArray(data.doctors)) {
          doctorsArray = data.doctors;
        }
  
        setDoctorsData(doctorsArray);
  
        if (doctorsArray.length > 0) {
          setMapCenter({ lat: doctorsArray[0].lat, lng: doctorsArray[0].lng });
        }
  
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div>
      {/* Navbar */}
      <header className="navbar flex h-24 items-center px-20 bg-gray-100 shadow-md sticky top-0 z-1000 w-full">
        <div className="logo flex items-center h-100">
          <img src={Logo} className="logo-image h-16 mr-3" alt="Logo" />
          <img src={Skinspect} className="logo-text h-9" alt="Skinspect" />
        </div>
        <nav className="ml-auto h-full flex items-center">
          <ul className="nav-links flex items-center gap-8 font-poppins text-base font-medium h-full">
            <li><Link to="/" className="text-blue-500 text-2xl">Home</Link></li>
            <li><Link to="/features" className="text-blue-500 text-2xl">Features</Link></li>
            <li><Link to="/about" className="text-blue-500 text-2xl">About</Link></li>
            <li><Link to="/faq" className="text-blue-500 text-2xl">FAQ</Link></li>
            <li><Link to="/login" className="text-blue-500 text-2xl">Login</Link></li>
            <li><Link to="/register" className="text-blue-500 text-2xl">Register</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Section */}
      <section
        className="main-content flex flex-col items-center min-h-screen"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-blue-100 rounded-lg shadow-md p-6 mt-10 w-4/5 max-w-5xl">
          {/* Doctor Table Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">List of doctors</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ▼ Filter
            </button>
          </div>

          {/* Doctor Table */}
          <p className="text-gray-600 mb-4">{doctorsData.length} available doctors</p>
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th className="border border-blue-500 px-4 py-2">S.No</th>
                <th className="border border-blue-500 px-4 py-2">Hospital/Clinic</th>
                <th className="border border-blue-500 px-4 py-2">Phone number</th>
                <th className="border border-blue-500 px-4 py-2">Timings</th>
                <th className="border border-blue-500 px-4 py-2">Ratings</th>
                <th className="border border-blue-500 px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
            {doctorsData.map((doctor, index) => (
  <tr key={doctor.id}>
    <td className="border border-blue-500 px-4 py-2">{index + 1}</td>
                  <td className="border border-blue-500 px-4 py-2">{doctor.name}</td>
                  <td className="border border-blue-500 px-4 py-2">{doctor.phone}</td>
                  <td className="border border-blue-500 px-4 py-2">{doctor.timings}</td>
                  <td className="border border-blue-500 px-4 py-2">{doctor.ratings}</td>
                  <td className="border border-blue-500 px-4 py-2">{doctor.location}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Load More Button */}
          <div className="flex justify-center mt-6">
            <button className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
              Load More
            </button>
          </div>

          {/* Google Map */}
          <div className="w-full h-96 mt-8 rounded-lg overflow-hidden">
            <LoadScript googleMapsApiKey={apiKey}>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={13}
              >
                {doctorsData.map((doc, index) => (
                  <Marker
                    key={index}
                    position={{ lat: doc.lat, lng: doc.lng }}
                    title={doc.name}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorsResult;
