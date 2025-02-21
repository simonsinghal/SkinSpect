import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import BackgroundImage from "../Images/BackgroundImage.png";

const FindDoctor = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]); // Added countries state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await fetch("YOUR_BACKEND_CITIES_ENDPOINT");
        const statesResponse = await fetch("YOUR_BACKEND_STATES_ENDPOINT");
        const countriesResponse = await fetch("YOUR_BACKEND_COUNTRIES_ENDPOINT");

        if (!citiesResponse.ok || !statesResponse.ok || !countriesResponse.ok) {
          throw new Error("Failed to fetch location data");
        }

        const citiesData = await citiesResponse.json();
        const statesData = await statesResponse.json();
        const countryData = await countriesResponse.json();

        setCities(citiesData);
        setStates(statesData);
        setCountries(countryData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-6xl text-white font-semibold text-center mb-8">
          Find Nearby Dermatologist
        </h2>
        <p className="text-center mb-10 text-white text-md">
          Mention your location details precisely for better results
        </p>

        {/* White Box */}
        <div className="bg-white rounded-2xl p-8 shadow-lg w-4/5 max-w-lg">
          <input
            type="text"
            placeholder="Range within which you need consultation (kms)"
            className="w-full p-2 mb-4 border rounded-2xl bg-blue-600 text-white placeholder-white"
          />
          <input
            type="text"
            placeholder="Pin Code"
            className="w-full p-2 mb-4 border rounded-2xl bg-blue-600 text-white placeholder-white"
          />
          <select className="w-full p-2 mb-4 border rounded-2xl bg-blue-600 text-white">
            <option>City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <select className="w-full p-2 mb-4 border rounded-2xl bg-blue-600 text-white">
            <option>State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select className="w-full p-2 mb-6 border rounded-2xl bg-blue-600 text-white">
            <option>Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
              onClick={() => navigate("/doctorsresult")}
            >
              Submit
            </button>
          </div>

          {/* Text Below Button */}
          <p className="text-xs text-center mt-4">
            *You can select upto 3 symptoms only
            <br />
            **Make sure to enter your correct details in name, gender and age criteria for better results
          </p>
        </div>
      </section>
    </div>
  );
};

export default FindDoctor;