import React, { useState , useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../authContext';
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import BackgroundImage from "../Images/BackgroundImage.png";

const FindDoctor = () => {
    const navigate = useNavigate();
    const [range, setRange] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const { currentUser, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to the home page after logout
      };
      

    const handleSubmit = () => {
        const locationData = {
            range: parseInt(range, 10), // Ensure range is a number
            pinCode: pinCode,
            city: city,
            state: state,
            country: country,
        };

        // Store location data in local storage to pass to the results page
        localStorage.setItem('findDoctorLocation', JSON.stringify(locationData));
        navigate("/doctorsresult");
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
            {currentUser ? (
              <>
                <li>
                  <Link to="/dashboard" className="text-blue-500 text-2xl">
                    My Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-blue-500 text-2xl">
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
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Pin Code"
                        className="w-full p-2 mb-4 border rounded-2xl bg-blue-600 text-white placeholder-white"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        className="w-full p-2 mb-4 border rounded-2xl bg-blue-600 text-white placeholder-white"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="State"
                        className="w-full p-2 mb-4 border rounded-2xl bg-blue-600 text-white placeholder-white"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Country"
                        className="w-full p-2 mb-6 border rounded-2xl bg-blue-600 text-white placeholder-white"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>

                    {/* Text Below Button */}
                    <p className="text-xs text-center mt-4">
                        *Make sure to enter your correct details in range, pincode, country, state and city for better results
                    </p>
                </div>
            </section>
        </div>
    );
};

export default FindDoctor;