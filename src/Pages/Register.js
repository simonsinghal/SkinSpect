import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import axios from "axios"; // Import Axios for API calls
>>>>>>> backend
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import Icon from "../Images/Icon.png";
import Facebook from "../Images/Facebook.png";
import Google from "../Images/Google.png";

<<<<<<< HEAD
=======
const API_URL = "http://localhost:5000/api/auth//register"; // Replace with actual API endpoint

>>>>>>> backend
const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
<<<<<<< HEAD
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registration submitted:", { fullName, email, password, confirmPassword });
        navigate("/login");
    };

    return (
        <div className="font-montserrat min-h-screen flex flex-col"> {/* Corrected: min-h-screen and flex flex-col on outer div */}
=======
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        try {
            const response = await axios.post(API_URL, {
                fullName,
                email,
                password,
                confirmPassword
            });

            if (response.status === 201) {
                console.log("Registration successful:", response.data);
                navigate("/login");
            }
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Something went wrong. Try again.");
        }
    };

    return (
        <div className="font-montserrat min-h-screen flex flex-col">
>>>>>>> backend
            <header className="navbar flex h-24 items-center px-20 bg-gray-100 shadow-md sticky top-0 z-1000 w-full">
                <div className="logo flex items-center h-full">
                    <img src={Logo} className="logo-image h-16 mr-3" alt="Logo" />
                    <img src={Skinspect} className="logo-text h-9" alt="Skinspect" />
                </div>
                <nav className="ml-auto h-full flex items-center">
<<<<<<< HEAD
          <ul className="nav-links flex items-center gap-8 font-poppins text-base font-medium h-full">
            <li>
              <Link to="/" className="text-blue-500 text-2xl" >Home</Link>
            </li>
            <li>
              <Link to="/features" className="text-blue-500 text-2xl ">Features</Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-500 text-2xl ">About</Link>
            </li>
            {/* <li>
              <Link to="/blog" className="text-blue-500 text-2xl ">Blog</Link>
            </li> */}
            <li>
              <Link to="/faq" className="text-blue-500 text-2xl ">FAQ</Link>
            </li>
            <li>
              <Link to="/login" className="text-blue-500 text-2xl ">Login</Link>
            </li>
            <li>
              <Link to="/register" className="text-blue-500 text-2xl">Register</Link>
            </li>
          </ul>
                </nav>
            </header>

            <div className="login-container flex-grow flex"> {/* Corrected: flex-grow on login-container */}
=======
                    <ul className="nav-links flex items-center gap-8 font-poppins text-base font-medium h-full">
                        <li><Link to="/" className="text-blue-500 text-2xl">Home</Link></li>
                        <li><Link to="/features" className="text-blue-500 text-2xl">Features</Link></li>
                        <li><Link to="/about" className="text-blue-500 text-2xl">About</Link></li>
                        <li><Link to="/blog" className="text-blue-500 text-2xl">Blog</Link></li>
                        <li><Link to="/faq" className="text-blue-500 text-2xl">FAQ</Link></li>
                        <li><Link to="/login" className="text-blue-500 text-2xl">Login</Link></li>
                        <li><Link to="/register" className="text-blue-500 text-2xl">Register</Link></li>
                    </ul>
                </nav>
            </header>

            <div className="login-container flex-grow flex">
>>>>>>> backend
                <div className="login-left w-1/2 relative bg-gradient-to-b from-[#0575E6] via-[#02298A] to-[#021B79]">
                    <div className="icon-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                        <img src={Icon} className="icon-image w-80 h-80" alt="Icon" />
                    </div>
                </div>

<<<<<<< HEAD
                <div className="login-right w-1/2 flex flex-col justify-center px-20 overflow-y-auto"> {/* Corrected: overflow-y-auto on login-right */}
                    <h3 className="text-3xl font-bold mb-2">Hello Again!</h3>
                    <p className="text-xl text-gray-600 mb-6">Signup to get Started</p>
=======
                <div className="login-right w-1/2 flex flex-col justify-center px-20 overflow-y-auto">
                    <h3 className="text-3xl font-bold mb-2">Hello Again!</h3>
                    <p className="text-xl text-gray-600 mb-6">Signup to get Started</p>

                    {error && <p className="text-red-500">{error}</p>} {/* Error Message */}

>>>>>>> backend
                    <form className="login-form w-3/4" onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-xl text-base" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </div>
                        <div className="form-group mb-4">
                            <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded-xl text-base" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group mb-4">
                            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-xl text-base" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="form-group mb-6">
                            <input type="password" placeholder="Confirm Password" className="w-full px-4 py-2 border rounded-xl text-base" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
<<<<<<< HEAD
                        <div className="flex justify-start w-full"> {/* Added w-full */}
=======
                        <div className="flex justify-start w-full">
>>>>>>> backend
                            <button className="login-button w-2/3 py-2 bg-[#1e54dc] text-white rounded-xl text-lg hover:bg-[#0056b3] transition duration-300" type="submit">Register</button>
                        </div>

                        <div className="mt-6 flex flex-col items-center w-2/3">
                            <Link to="/login" className="forgot-password text-base underline text-[#02298A] hover:text-[#0056b3] transition duration-300 mb-4 text-center">Already have an account?</Link>
                            <div className="social-icons flex justify-center gap-4">
                                <Link to="/auth/google"><img src={Google} className="google w-12 h-12" alt="Google Icon" /></Link>
                                <Link to="/auth/facebook"><img src={Facebook} className="facebook w-12 h-12" alt="Facebook Icon" /></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default Register;
=======
export default Register;
>>>>>>> backend
