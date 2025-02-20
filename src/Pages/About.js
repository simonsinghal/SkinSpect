<<<<<<< HEAD
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Logo from "../Images/Logo.png";
import Icon from "../Images/Icon.png";
import Skinspect from "../Images/Skinspect.png";
import AbtIcon from "../Images/abtIcon.png";
import desc1 from "../Images/desc1.png";
import desc2 from "../Images/desc2.png";
import desc3 from "../Images/desc3.png";
import desc4 from "../Images/desc4.png";
import upload from "../Images/upload.png";
import analyze from "../Images/analyze.png";
import review from "../Images/review.png";
import consult from "../Images/consult.png";
import cust1 from "../Images/cust1.png";
import cust2 from "../Images/cust2.png";
import cust3 from "../Images/cust3.png";

const About = () => {
  const section3Ref = useRef(null);

  const scrollToSection3 = () => {
    if (section3Ref.current) {
      section3Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-montserrat flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="navbar flex h-24 items-center px-20 bg-gray-100 shadow-md sticky top-0 z-1000 w-full">
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

      <main className="flex-grow bg-gray-100 overflow-y-auto">
        {/* Section 1: Hero Section */}
        <section className="bg-white py-20 px-6 md:px-24 w-full">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-left">
              <h2 className="text-6xl font-bold mb-4 text-blue-900 leading-tight">
                Spot Skin Issues Early:
                <br />
                <span className="text-blue-500">
                  AI-Powered Detection at Your Fingertips
                </span>
              </h2>
              <p className="text-medium mb-8 text-gray-700">
                We leverage cutting-edge Artificial Intelligence to provide
                fast, accurate, and accessible skin disease detection. Our goal
                is to empower individuals to take control of their skin health.
              </p>
              <button className="bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600">
                Analyze Your Skin Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="rounded-full overflow-hidden w-42 h-42 border border-gray-400  ml-10">
                <img
                  src={AbtIcon}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: AI Perfection */}
        <section className="py-12 px-6 md:px-24 w-full bg-blue-600">
          <div className="container mx-auto">
            <div className="text-left">
              <h2
                className="text-5xl font-bold mb-4 text-white"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                AI Perfection
              </h2>
              <p className="text-lg mb-8 text-white">
                Experience the Power of AI for Skin Analysis
              </p>
              <button
                className="bg-white text-blue-700 py-3 px-6 rounded-lg font-medium hover:bg-blue-200"
                onClick={scrollToSection3}
              >
                Read More
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Four Cards Section */}
        <section
          className="py-12 px-6 md:px-24 w-full bg-blue-100"
          ref={section3Ref}
        >
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[desc1, desc2, desc3, desc4].map((desc, index) => {
              const titles = [
                "Instant Results",
                "High Accuracy",
                "User Friendly",
                "Secure & Private",
              ];
              const descriptions = [
                "Get quick skin analysis results in seconds using AI. Our cutting-edge technology delivers rapid insights into your skin's condition, empowering you to take proactive steps towards better skincare.", // Expanded description
                "Utilizing advanced AI models to ensure precise detection. We employ state-of-the-art machine learning algorithms trained on vast datasets of dermatological images to provide highly accurate and reliable results.", // Expanded description
                "Simple and intuitive interface for seamless experience. Our user-friendly platform makes it easy for anyone to access and understand their skin analysis results, regardless of technical expertise.", // Expanded description
                "Your skin analysis data is encrypted and private. We prioritize the security and privacy of your personal information. All data is encrypted and handled with the utmost confidentiality.", // Expanded description
              ];

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 flex md:flex-row flex-col w-full items-start"
                  style={{ minHeight: "210px" }}
                >
                  <div className="md:w-20 md:h-20 w-full flex items-center justify-center  mr-6 md:mr-0 md:mb-0 mb-4 shrink-0">
                    <img
                      src={desc}
                      alt={`Feature ${index + 1}`}
                      className="w-22 h-22 rounded-full"
                    />
                  </div>
                  <div className="text-left flex-grow">
                    <h3 className="text-lg font-medium mb-2 text-blue-900">
                      {titles[index]}
                    </h3>
                    <p className="text-gray-900 text-medium">
                      {descriptions[index]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: About our Project */}
        <section className="py-12 px-6 md:px-24 w-full">
          <div className="container mx-auto flex flex-col md:flex-row items-start">
            {/* Left Half: Circles (Grid) */}
            <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {" "}
              {/* Removed gap */}
              {[upload, analyze, review, consult].map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 bg-blue-500 rounded-full shadow-md w-48 h-48" /* Increased size */
                >
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-40 h-40 rounded-full" /* Increased image size */
                  />
                </div>
              ))}
            </div>

            {/* Right Half: About Project */}
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-4xl font-bold mb-8 text-blue-900">
                About Our Project
              </h2>
              <p className="text-gray-900 text-medium text-justify">
                SKINSPECT is an AI-powered skin disease detection system. By
                integrating advanced machine learning techniques and image
                processing algorithms, SKINSPECT aims to bridge the gap in
                dermatological care, making expert-level diagnosis more
                accessible, consistent, and scalable. It is designed to not only
                predict skin diseases but also provide personalized treatment
                options and hospital recommendations, ensuring that patients
                receive timely and appropriate care. This approach leverages the
                power of technology to overcome the traditional barriers to
                effective skin disease diagnosis, offering a modern solution
                that addresses both accessibility and accuracy concerns.
              </p>
              <div className="text-left">
                <button className="bg-blue-500 text-white py-3 mt-8 px-6 rounded-lg font-medium hover:bg-blue-600">
                  View All
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Team Section */}
        <section className="py-12 px-6 md:px-24 w-full bg-gray-50">
  <div className="container mx-auto">
    {/* Heading */}
    <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
      What People Are Saying
    </h2>

    {/* Reviews Container */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Review 1 */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border-2 border-blue-500">
          <img
            src={cust1}
            alt="Customer 1"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-gray-600 italic text-center">
          "Skinspect helped me detect a skin issue early. The AI
          analysis was fast and accurate!"
        </p>
      </div>

      {/* Review 2 */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border-2 border-blue-500">
          <img
            src={cust2}
            alt="Customer 2"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-gray-600 italic text-center">
          "Amazing tool! It gave me insights about my skin condition
          before my doctor's visit."
        </p>
      </div>

      {/* Review 3 */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border-2 border-blue-500">
          <img
            src={cust3}
            alt="Customer 3"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-gray-600 italic text-center">
          "The AI diagnosis was surprisingly accurate. I highly
          recommend this app!"
        </p>
      </div>
    </div>
  </div>
</section>

        {/* Section 6: Contact Query Section */}
        <section className="py-12 px-6 md:px-24 w-full bg-blue-100">
  <div className="container mx-auto">
    <div className="text-left">
      <h2 className="text-4xl font-bold mb-4">Your Query</h2>
      <form className="md:w-full"> {/* Set form width to half of parent's width on medium screens */}
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 w-full" // w-full for button
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</section>


      </main>

      <Footer />
    </div>
  );
};

export default About;
=======
import React from 'react'

const About = () => {
  return (
    <div>
      About
    </div>
  )
}

export default About
>>>>>>> backend
