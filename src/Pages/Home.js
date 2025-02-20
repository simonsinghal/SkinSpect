import React from "react";
import { Link } from "react-router-dom";
import Icon from "../Images/Icon.png";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import BackgroundImage from "../Images/BackgroundImage.png";
import robot from "../Images/robot.png";
import w1 from "../Images/w1.png";
import w2 from "../Images/w2.png";
import w3 from "../Images/w3.png";
import leftArrow from "../Images/left-arrow.png";
import rightArrow from "../Images/right-arrow.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const diseases = [
    { id: 1, name: "Acne", content: "Lorem ipsum..." },
    { id: 2, name: "Eczema", content: "Lorem ipsum..." },
    { id: 3, name: "Psoriasis", content: "Lorem ipsum..." },
    { id: 4, name: "Melanoma", content: "Lorem ipsum..." },
    { id: 5, name: "Rosacea", content: "Lorem ipsum..." },
    { id: 6, name: "Dermatitis", content: "Lorem ipsum..." },
    // Add more diseases with content as needed
  ];

  const renderArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        style={{
          position: "absolute",
          zIndex: 2,
          top: "50%",
          left: "15px",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img
          src={leftArrow}
          alt="Previous"
          style={{ width: "30px", height: "30px" }}
        />
      </button>
    );

  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        style={{
          position: "absolute",
          zIndex: 2,
          top: "50%",
          right: "15px",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img
          src={rightArrow}
          alt="Next"
          style={{ width: "30px", height: "30px" }}
        />
      </button>
    );

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

      {/* Main Content Section */}
      <section
        className="main-content flex justify-center items-center h-screen"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content-wrapper text-center text-white">
          <img
            src={Icon}
            className="icon-image h-[300px] mx-auto mb-4 relative bottom-12"
            alt="Icon"
          />
          <h2 className="heading text-4xl mb-2 font-bold">
            YOUR SKIN HEALTH SIMPLIFIED WITH AI
          </h2>
          <p className="text-xl mb-6">
            24/7 Online Skin Disease Analysis By Uploading Image File, Audio
            File and Prescription
          </p>
          <button className="cta-button bg-[#3363de] text-white py-2 px-6 rounded-lg text-lg font-montserrat hover:bg-[#0056b3] transition duration-300 shadow-md hover:shadow-lg">
            Get Started
          </button>
        </div>
      </section>

      {/* Diseases Covered Section */}
      <section className="py-12 px-6 md:px-24 bg-blue-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Which Skin Conditions Require Evaluation With SkinSpect Website?
          </h2>
          <Carousel
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            emulateTouch={true}
            swipeable={true}
            dynamicHeight={true}
            className="custom-carousel-dots"
            renderArrowPrev={renderArrowPrev}
            renderArrowNext={renderArrowNext}
          >
            {diseases.map((disease) => (
              <div key={disease.id} className="p-4">
                <div className="bg-white rounded-lg p-8 flex items-center justify-center h-auto">
                  {" "}
                  {/* Increased padding to p-8 */}
                  {/* Blue Circle on the Left */}
                  <div className="bg-blue-500 rounded-full w-32 h-32 flex items-center justify-center mr-12">
                    {" "}
                    {/* Increased mr-12 */}
                    {/* Placeholder for disease icon or image */}
                  </div>
                  {/* Content on the Right */}
                  <div className="text-left">
                    <h3 className="text-xl font-semibold mb-2">
                      {disease.name}
                    </h3>
                    <p className="text-gray-700">{disease.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Section 3 */}
      <section className="py-0 px-6 md:px-24 bg-blue-500">
        <div className="container mx-auto flex items-end">
          {/* Robot Image (Left) */}
          <div className="md:w-1/2 flex justify-center flex-grow">
            <img src={robot} alt="AI Robot" className="max-w-full max-h-full" />
          </div>

          {/* Content (Right) */}
          <div className="md:w-1/2 md:pl-8 text-left">
            <h2 className="text-3xl text-white font-bold mb-4">
              How does Artificial Intelligence analyze images?
            </h2>
            <p className="text-white mb-4 text-justify">
              AI Dermatologist uses a deep machine learning algorithm
              (AI-algorithm). The human ability to learn from examples and
              experiences has been transferred to a computer. For this purpose,
              the neural network has been trained using a dermoscopic imaging
              database containing tens of thousands of examples that have
              confirmed diagnosis and assessment by dermatologists.
            </p>
            <p className="text-white mb-4 text-justify">
              The AI is able to distinguish between benign and malignant tumors,
              similar to the ABCDE rule (5 main signs of oncology: asymmetry,
              boundary, color, diameter, and change over time). The difference
              between them is that the algorithm can analyze thousands of
              features, but not only 5 of them. Of course, only a machine can
              detect that amount of evidence.
            </p>
            <p className="text-white text-justify mb-8">
              Due to the productive cooperation with doctors, the quality of the
              algorithm performance is constantly being improved. Based on
              growing experience and its own autonomous rules, the AI is able to
              distinguish between lot of skin
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: How it works  */}
      <section className="py-12 px-6 md:px-24">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            How to use SkinSpect AI Feature?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-blue-100 rounded-lg p-6 shadow-md">
              <img src={w1} alt="Take a Photo 1" className="mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Take a Photo</h3>
              <p className="text-gray-700 text-sm">
                Keep zoomed at the closest distance (less than 10 cm), keep in
                focus and center only the skin mark (without hair, wrinkles and
                other objects).
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-blue-100 rounded-lg p-6 shadow-md">
              <img src={w2} alt="Take a Photo 2" className="mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Identify and send</h3>
              <p className="text-gray-700 text-sm">
                Send your photo to the Artificial Intelligence. The system will
                analyze it and send you a risk assessment.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-blue-100 rounded-lg p-6 shadow-md">
              <img
                src={w3}
                alt="Receive your risk assessment"
                className="mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold mb-2">
                Receive your risk assessment
              </h3>
              <p className="text-gray-700 text-sm">
                Get the result within 60 seconds and related advice on the next
                steps to take.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          .custom-carousel-dots .control-dots .dot {
            width: 16px;
            height: 16px;
            background-color: #3363de;
            margin: 0 8px;
          }
          .custom-carousel-dots .control-dots .dot.selected {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
