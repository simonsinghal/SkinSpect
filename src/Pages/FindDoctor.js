import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import BackgroundImage from "../Images/BackgroundImage.png";

const FindDoctor = () => {
    const [doctorsData, setDoctorsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("YOUR_BACKEND_API_ENDPOINT"); // Replace with actual API endpoint
          if (!response.ok) {
            throw new Error("Failed to fetch doctor data");
          }
          const data = await response.json();
          setDoctorsData(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
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

      <section
        className="main-content flex flex-col items-center min-h-screen"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-blue-100 rounded-lg shadow-md p-6 mt-10 w-4/5 max-w-5xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">List of doctors</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ▼ Filter
            </button>
          </div>
          <p className="text-gray-600 mb-4">25 available doctors</p>
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th className="border  border-blue-500 px-4 py-2">S.No</th>
                <th className="border  border-blue-500 px-4 py-2">Hospital/Clinic</th>
                <th className="border  border-blue-500 px-4 py-2">Phone number</th>
                <th className="border  border-blue-500 px-4 py-2">Timings</th>
                <th className="border  border-blue-500 px-4 py-2">Ratings</th>
                <th className="border  border-blue-500 px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {doctorsData.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="border border-blue-500 px-4 py-2">{doctor.id}</td>
                  <td className="border  border-blue-500px-4 py-2">{doctor.name}</td>
                  <td className="border  border-blue-500 px-4 py-2">{doctor.phone}</td>
                  <td className="border  border-blue-500 px-4 py-2">{doctor.timings}</td>
                  <td className="border  border-blue-500 px-4 py-2">{doctor.ratings}</td>
                  <td className="border  border-blue-500 px-4 py-2">{doctor.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-6">
            <button className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
              Load More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FindDoctor;