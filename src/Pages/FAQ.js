import React, { useState, useEffect, useRef, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import { AuthContext } from '../authContext';
import { Accordion, AccordionItem } from "@radix-ui/react-accordion";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import BackgroundImage from "../Images/BackgroundImage.png";

export default function FAQ() {
  const faqs = [
    {
      question: "What is Skinspect?",
      answer:
        "Skinspect is an AI-powered web application designed to help users identify potential skin issues by analyzing images or symptoms. It provides insights, predictions, and preventive care recommendations while connecting users with nearby specialists for further consultation.",
    },
    {
      question: "How does Skinspect work?",
      answer:
        "Upload an image of your skin issue or describe your symptoms. Our AI analyzes the input using advanced machine learning models trained on diverse datasets. You receive a detailed report with predictions, recommendations, and options to consult a specialist if needed.",
    },
    {
      question: "Do I need a medical background to use Skinspect?",
      answer:
        "Not at all! Skinspect is designed to be user-friendly and accessible to everyone, regardless of technical or medical knowledge.",
    },
    {
      question: "Is Skinspect free to use?",
      answer:
        "Yes, Skinspect is free to use with optional premium features for advanced insights.",
    },
    {
      question: "Can Skinspect detect all skin conditions?",
      answer:
        "Skinspect is trained on a vast dataset but may not detect rare or highly complex conditions. It is recommended to consult a dermatologist for a professional diagnosis.",
    },
    {
      question: "Can I use Skinspect to connect with a dermatologist?",
      answer:
        "Yes, Skinspect provides options to connect with dermatologists for further consultation based on your analysis results.",
    },
    {
      question: "How long does it take to get results?",
      answer:
        "The AI processes your input within seconds, providing instant results and recommendations.",
    },
    {
      question: "How can I provide feedback or report an issue?",
      answer:
        "You can provide feedback or report issues through the support section on our website or by contacting customer support.",
    },
  ];

  const [openItems, setOpenItems] = useState([]);
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to the home page after logout
  };

  const handleItemClick = (item) => {
    setOpenItems((prevOpenItems) => {
      if (prevOpenItems.includes(item)) {
        return prevOpenItems.filter((openItem) => openItem !== item);
      } else {
        return [...prevOpenItems, item];
      }
    });
  };

  return (
    <div className="font-montserrat flex flex-col min-h-screen">
      {" "}
      {/* min-h-screen on outer div */}
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
            {/* <li>
              <Link to="/blog" className="text-blue-500 text-2xl">
                Blog
              </Link>
            </li> */}
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
      <main className="flex-grow bg-gray-100 overflow-y-auto flex flex-col items-center">
        <div className="faq-heading-container relative w-full max-w-2xl mb-8">
          <h1 className="text-3xl font-bold text-white py-4 px-6 rounded-xl shadow-lg relative z-10 bg-blue-900">
            FAQ - Dermatologist Testimonials
          </h1>
          <div
            className="faq-heading-background absolute inset-0 rounded-xl bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
          ></div>
        </div>

        <div className="w-full max-w-2xl mt-6">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={faq.question}>
                <div
                  className="p-4 border-b border-gray-300 cursor-pointer text-lg font-semibold flex items-center justify-between"
                  onClick={() => handleItemClick(faq.question)}
                >
                  {faq.question}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform duration-300 ${
                      openItems.includes(faq.question) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div
                  className={`p-4 bg-gray-100 rounded-b-lg ${
                    openItems.includes(faq.question) ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}
