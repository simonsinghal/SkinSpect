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
            <li>
              <Link to="/blog" className="text-blue-500 text-2xl">
                Blog
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

      <main className="flex-grow bg-gray-100 overflow-y-auto">
        {/* Section 1: Hero Section */}
        <section className="bg-white py-20 px-6 md:px-24 w-full">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-left">
              <h2 className="text-4xl font-bold mb-4 text-blue-900 leading-tight">
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
              <div className="rounded-full overflow-hidden w-50 h-50 border border-gray-400">
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
        <section className="py-12 px-6 md:px-24 w-full bg-blue-100">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">AI Perfection</h2>
            <p className="text-lg mb-8">
              Experience the Power of AI for Skin Analysis
            </p>
            <button
              className="bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600"
              onClick={scrollToSection3}
            >
              Read Below
            </button>
          </div>
        </section>

        {/* Section 3: Four Cards Section */}
        <section className="py-12 px-6 md:px-24 w-full" ref={section3Ref}>
          <div className="container mx-auto flex flex-wrap justify-center gap-8">
            {/* Card 1 */}
            <div className="w-64 bg-blue-50 rounded-lg shadow-md p-6 flex flex-col">
              <div className="flex justify-center mb-4">
                <img
                  src={desc1}
                  alt="Feature 1"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium mb-2 text-blue-900">
                  Instant Results
                </h3>
                <p className="text-gray-900 text-medium">
                  Get quick skin analysis results in seconds using AI.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-64 bg-blue-50 rounded-lg shadow-md p-6 flex flex-col">
              <div className="flex justify-center mb-4">
                <img
                  src={desc2}
                  alt="Feature 2"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium mb-2 text-blue-900">
                  High Accuracy
                </h3>
                <p className="text-gray-900 text-medium">
                  Utilizing advanced AI models to ensure precise detection.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-64 bg-blue-50 rounded-lg shadow-md p-6 flex flex-col">
              <div className="flex justify-center mb-4">
                <img
                  src={desc3}
                  alt="Feature 3"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium mb-2 text-blue-900">
                  User Friendly
                </h3>
                <p className="text-gray-900 text-medium">
                  Simple and intuitive interface for seamless experience.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="w-64 bg-blue-50 rounded-lg shadow-md p-6 flex flex-col">
              <div className="flex justify-center mb-4">
                <img
                  src={desc4}
                  alt="Feature 4"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium mb-2 text-blue-900">
                  Secure & Private
                </h3>
                <p className="text-gray-900 text-medium">
                  Your skin analysis data is encrypted and private.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: How It Works */}
        <section className="py-12 px-6 md:px-24 w-full">
          <div className="container mx-auto flex flex-col items-center text-center">
            {/* Headline */}
            <h2 className="text-4xl font-bold mb-8 text-blue-900">
              How It Works
            </h2>

            {/* Steps Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              {/* Step 1: Upload */}
              <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow-md">
                <img
                  src={upload}
                  alt="Upload"
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold text-blue-900">Upload</h3>
                <p className="text-gray-900 text-medium text-center">
                  Take a clear photo of the affected area.
                </p>
              </div>

              {/* Step 2: Analyze */}
              <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow-md">
                <img
                  src={analyze}
                  alt="Analyze"
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold text-blue-900">Analyze</h3>
                <p className="text-gray-900 text-medium text-center">
                  Our AI algorithms analyze the image for potential skin
                  conditions.
                </p>
              </div>

              {/* Step 3: Review */}
              <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow-md">
                <img
                  src={review}
                  alt="Review"
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold text-blue-900">Review</h3>
                <p className="text-gray-900 text-medium text-center">
                  Receive a detailed report with potential diagnoses and
                  recommendations.
                </p>
              </div>

              {/* Step 4: Consult */}
              <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow-md">
                <img
                  src={consult}
                  alt="Consult"
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold text-blue-900">Consult</h3>
                <p className="text-gray-900 text-medium text-center">
                  Connect with a dermatologist for expert advice and treatment.
                </p>
              </div>
            </div>
          </div>
        </section>


                {/* Section 5: Team Section */}
 {/* Section: What People Are Saying */}
<section className="py-12 px-6 md:px-24 w-full bg-gray-50">
  <div className="container mx-auto text-center">
    {/* Heading */}
    <h2 className="text-4xl font-bold text-blue-900 mb-8">What People Are Saying</h2>

    {/* Reviews Container */}
    <div className="flex flex-wrap justify-center gap-8">
      
      {/* Review 1 */}
      <div className="w-64 bg-white p-6 rounded-lg shadow-md">
        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-blue-500">
          <img src={cust1} alt="Customer 1" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-medium mb-1">John Doe</h3>
        <p className="text-gray-600 italic">"Skinspect helped me detect a skin issue early. The AI analysis was fast and accurate!"</p>
      </div>

      {/* Review 2 */}
      <div className="w-64 bg-white p-6 rounded-lg shadow-md">
        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-blue-500">
          <img src={cust2} alt="Customer 2" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-medium mb-1">Sarah Lee</h3>
        <p className="text-gray-600 italic">"Amazing tool! It gave me insights about my skin condition before my doctor's visit."</p>
      </div>

      {/* Review 3 */}
      <div className="w-64 bg-white p-6 rounded-lg shadow-md">
        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-blue-500">
          <img src={cust3} alt="Customer 3" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-medium mb-1">Michael Smith</h3>
        <p className="text-gray-600 italic">"The AI diagnosis was surprisingly accurate. I highly recommend this app!"</p>
      </div>

    </div>
  </div>
</section>


        {/* Section 6: Contact Query Section */}
        <section className="py-12 px-6 md:px-24 w-full bg-gray-200">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Your Query</h2>
            <form className="max-w-lg mx-auto">
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
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
