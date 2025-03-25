import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "../Images/Icon.png";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import BackgroundImage from "../Images/BackgroundImage.png";
import axios from "axios";

const Dashboard = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
  
    const fetchScans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/scans/${userId}`);
        console.log("Fetched Scans:", response.data);
        setScans(response.data);
      } catch (error) {
        console.error("Error fetching scans:", error);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchScans();
  }, [userId]);
  

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
            {/* <li>
                  <Link to="/blog" className="text-blue-500 text-2xl ">Blog</Link>
                </li> */}
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
        className="main-content flex"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="flex w-full">
          {/* Left Section: New Scan and Sort/Show Options */}
          <div
            className="w-1/4 p-8 bg-white rounded-lg m-8 mt-8"
            style={{ height: "62%", width: "22%", borderRadius: "20px" }}
          >
            <div
              className="border-4 border-blue-800 rounded-2xl flex items-center justify-center py-2"
              style={{ height: "13%" }}
            >
              <h2
                className="text-blue-700 font-bold text-2xl"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                New Scan
              </h2>
            </div>

            <div className="mt-8"></div>

            {/* Blue Box */}
            <div
              className="bg-blue-600 rounded-md p-4 py-1"
              style={{ width: "260px", height: "296px", margin: "0 auto" }}
            >
              <div className="mb-4">
                <h3 className="font-bold mb-2 mt-10 text-white">
                  SORT SCAN BY
                </h3>
                <label className="block text-white">
                  <input
                    type="radio"
                    name="sort"
                    value="newest"
                    className="mr-2"
                  />
                  Newest
                </label>
                <label className="block text-white">
                  <input
                    type="radio"
                    name="sort"
                    value="oldest"
                    className="mr-2"
                  />
                  Oldest
                </label>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-white">SHOW BY TYPE</h3>
                <label className="block text-white">
                  <input
                    type="radio"
                    name="show"
                    value="image"
                    className="mr-2"
                  />
                  Image Analysis
                </label>
                <label className="block text-white">
                  <input
                    type="radio"
                    name="show"
                    value="text"
                    className="mr-2"
                  />
                  Text Analysis
                </label>
              </div>
            </div>
          </div>

          {/* Right Section: Profile */}
          <div className="w-3/4 m-8 mt-8">
            {/* Tabs (Scans, Profile) */}
            <div className="flex border-b border-gray-300 rounded-t-lg mb-6">
              <button
                className={`px-4 py-2 ml-10 text-xl text-white ${
                  activeTab === "Scans" ? "border-b-2 border-white" : ""
                }`}
                onClick={() => setActiveTab("Scans")}
              >
                Scans
              </button>
              <button
                className={`px-4 py-2 mr-20 text-xl text-white ${
                  activeTab === "Profile" ? "border-b-2 border-white" : ""
                }`}
                onClick={() => setActiveTab("Profile")}
              >
                Profile
              </button>
            </div>

            {/* Content Below Tabs */}
            <div
              className="p-8 bg-white rounded-3xl"
              style={{ width: "850px", height: "570px", margin: "0 auto" }}
            >
              {activeTab === "Profile" && (
                <div className="mt-4">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-center justify-start">
                      <label
                        className="mr-4"
                        style={{
                          width: "100px",
                          textAlign: "right",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        Name:
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        className="border rounded-full p-2 bg-blue-600 text-white h-10 placeholder-white w-full flex-1"
                      />
                    </div>
                    <div className="flex items-center justify-start">
                      <label
                        className="mr-4"
                        style={{
                          width: "100px",
                          textAlign: "right",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        placeholder="Email"
                        className="border rounded-full p-2 bg-blue-600 text-white h-10 placeholder-white w-max flex-1"
                      />
                    </div>
                    <div className="flex items-center justify-start">
                      <label
                        className="mr-4"
                        style={{
                          width: "100px",
                          textAlign: "right",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        Phone No:
                      </label>
                      <input
                        type="tel"
                        placeholder="Phone No."
                        className="border rounded-full p-2 bg-blue-600 text-white h-10 placeholder-white w-max flex-1"
                      />
                    </div>
                    <div className="flex items-center justify-start">
                      <label
                        className="mr-4"
                        style={{
                          width: "100px",
                          textAlign: "right",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        Password:
                      </label>
                      <div className="relative w-max flex-1">
                        <input
                          type="password"
                          placeholder=" "
                          className="border rounded-full p-2 pr-10 bg-blue-600 text-white h-10 placeholder-white w-full"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-start col-span-1">
                      <label
                        className="mr-4"
                        style={{
                          width: "100px",
                          textAlign: "right",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        Location:
                      </label>
                      <div
                        className="flex gap-2 flex-wrap"
                        style={{ flex: "2" }}
                      >
                        <input
                          type="text"
                          placeholder="Pin Code"
                          className="border rounded-full p-2 bg-blue-600 text-white h-10 placeholder-white w-1/2"
                          style={{ width: "calc(40% - 4px)" }}
                        />
                        <input
                          type="text"
                          placeholder="Country"
                          className="border rounded-full p-2 bg-blue-600 text-white h-10 placeholder-white w-1/2"
                          style={{ width: "calc(40% - 4px)" }}
                        />
                        <input
                          type="text"
                          placeholder="State"
                          className="border rounded-full p-2 bg-blue-600 text-white h-10 placeholder-white w-1/2"
                          style={{ width: "calc(40% - 4px)" }}
                        />
                        <input
                          type="text"
                          placeholder="City"
                          className="border rounded-full p-2 bg-blue-600 text-white h-10 placeholder-white w-1/2"
                          style={{ width: "calc(40% - 4px)" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold mt-10 py-2 px-4 rounded-xl">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "Scans" && (
                <div className="mt-4">
                  {scans.length === 0 ? (
                    // If no scans exist
                    <div className="flex flex-col items-center justify-center pt-20 pb-20 rounded-xl bg-white">
                      <h2 className="text-4xl font-bold text-black mb-4">
                        No recent scans
                      </h2>
                      <p className="text-gray-600 mb-8">
                        Start a scan to see your result here
                      </p>
                      <button
                        className="bg-transparent border-4 border-blue-700 rounded-full px-8 py-3 text-blue-700 font-bold text-lg"
                        onClick={() => navigate("/imageanalysis")}
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          width: "40%",
                        }}
                      >
                        Get Started
                      </button>
                    </div>
                  ) : (
                    // If scans exist, show recorded scans
                    <div className="bg-white shadow-md p-6 rounded-lg">
                      <h2 className="text-xl font-bold text-gray-700">
                        Recorded Scans
                      </h2>
                      <p className="text-gray-500">
                        Total Analysis: {scans.length}
                      </p>

                      <div className="overflow-x-auto mt-4">
                      <table className="min-w-full border border-gray-300 rounded-lg">
  <thead>
    <tr className="bg-blue-700 text-white">
      <th className="px-4 py-2">S.No</th>
      <th className="px-4 py-2">Details</th>
      <th className="px-4 py-2">Images/Symptoms</th>
      <th className="px-4 py-2">Diseases Predicted</th>
    </tr>
  </thead>
  <tbody>
    {scans.map((scan, index) => (
      <tr key={index} className="border-b text-center">
        <td className="px-4 py-2">{index + 1}</td>
        <td className="px-4 py-2">
          {scan.name}, {scan.age}, {scan.gender}
        </td>
        <td className="px-4 py-2 flex justify-center gap-2">
          {scan.images.map((image, imgIndex) => (
            <img
              key={imgIndex}
              src={`http://localhost:5000/${image}`} // Ensure the correct image path
              alt="Symptom"
              className="w-16 h-16 object-cover rounded"
            />
          ))}
        </td>
        <td className="px-4 py-2 text-blue-600">
          {scan.result || "Pending..."}
        </td>
      </tr>
    ))}
  </tbody>
</table>

                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
