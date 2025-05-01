import React, { useState , useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import Icon from "../Images/Icon.png";
import Facebook from "../Images/Facebook.png";
import Google from "../Images/Google.png";
import { AuthContext } from '../authContext';

const Login = ({ setCurrentUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            login(data.user, data.token); 

            // localStorage.setItem("token", data.token);
            // localStorage.setItem("user", JSON.stringify(data.user));

            // setCurrentUser(data.user); // Update state with logged-in user

            // Check user role and redirect accordingly
            if (data.user && (data.user.role === 'admin' || data.user.isAdmin === true)) {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="font-montserrat min-h-screen flex flex-col">
            <header className="navbar flex h-24 items-center px-20 bg-gray-100 shadow-md sticky top-0 z-1000 w-full">
                <div className="logo flex items-center h-full">
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
            <div className="login-container flex-grow flex">
                <div className="login-left w-1/2 relative bg-gradient-to-b from-[#0575E6] via-[#02298A] to-[#021B79]">
                    <div className="icon-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                        <img src={Icon} className="icon-image w-80 h-80" alt="Icon" />
                    </div>
                </div>
                <div className="login-right w-1/2 flex flex-col justify-center px-20 overflow-y-auto">
                    <h3 className="text-3xl font-bold mb-2">Hello!</h3>
                    <p className="text-xl text-gray-600 mb-6">Welcome Back</p>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form className="login-form w-3/4" onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-2 border rounded-xl text-base"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-xl text-base"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-start w-full">
                            <button
                                className="login-button w-2/3 py-2 bg-[#1e54dc] text-white rounded-xl text-lg hover:bg-[#0056b3] transition duration-300"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>

                        <div className="mt-6 flex flex-col items-center w-2/3">
                            <Link
                                to="/login"
                                className="forgot-password text-base underline text-[#02298A] hover:text-[#0056b3] transition duration-300 mb-4 text-center"
                            >
                                Forgot Password
                            </Link>
                            <div className="social-icons flex justify-center gap-4">
                                <Link to="/auth/google">
                                    <img src={Google} className="google w-12 h-12" alt="Google Icon" />
                                </Link>
                                <Link to="/auth/facebook">
                                    <img src={Facebook} className="facebook w-12 h-12" alt="Facebook Icon" />
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;