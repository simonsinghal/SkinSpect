import React from "react";
import { Link } from "react-router-dom"; 
import Icon from "../Images/Icon.png";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import curveBg from "../Images/curves.png";
import doctorImg from "../Images/doctor.png";
import doctor from "../Images/doctor2.png";
import bg4 from "../Images/bg4.png";
import collage from "../Images/collage.png";
import img1 from "../Images/img1.png";
import img2 from "../Images/img2.png";
import img3 from "../Images/img3.png";
import img4 from "../Images/img4.png";
import img5 from "../Images/img5.png";
import img6 from "../Images/img6.png";

const FeaturesPage = () => {
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

      {/* Hero Section */}
      <section
        className="py-12 px-6 md:px-24 w-full relative"
        style={{
          backgroundImage: `url(${doctorImg})`,
          backgroundSize: "100vw auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-end">
          <div className="md:w-1/2 text-left text-white md:pr-16">
            <h2 className="text-5xl font-bold mb-4 leading-tight">
              We're Always Ready To Help You..
            </h2>
            <div className="text-left">
              <p className="text-lg mb-8">
                We believe in providing accessible and reliable skin care
                solutions through the power of AI. Our mission is to empower
                individuals to take control of their skin health with
                confidence.
              </p>
              <button className="bg-white text-blue-700 py-3 px-6 rounded-lg font-medium hover:bg-blue-200">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="pt-0 px-6 md:px-24 w-full relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 absolute top-0 left-0 w-full h-[300px] md:h-[300px]">
                {/* Column 1 */}
                <div className="bg-blue-100 p-6 text-center flex flex-col rounded-l-lg md:rounded-l-lg h-fit md:h-[300px]">
                    <h3 className="text-2xl font-semibold mb-2">Image Analysis</h3>
                    <div className="h-1 w-16 bg-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-700 flex-grow text-lg">
                        Unlock powerful insights from images with AI-driven analysis.
                        Detect patterns, recognize objects, and extract valuable data with
                        ease.
                    </p>
                    <Link to="/imageanalysis" className="text-blue-500 mt-4 underline">Analyze</Link>
                </div>

                {/* Column 2 */}
                <div className="bg-blue-300 p-6 text-center flex flex-col h-fit md:h-[300px]">
                    <h3 className="text-2xl font-semibold mb-2">Text Analysis</h3>
                    <div className="h-1 w-16 bg-blue-700 mx-auto mb-4"></div>
                    <p className="text-gray-700 flex-grow text-lg">
                        Analyze and understand text with advanced AI tools. Extract key
                        information, summarize content, and gain deep insights
                        efficiently.
                    </p>
                    <Link to="/textanalysis" className="text-blue-700 mt-4 underline">Analyze</Link>
                </div>

                {/* Column 3 */}
                <div className="bg-blue-500 p-6 text-center flex flex-col h-fit md:h-[300px]">
                    <h3 className="text-2xl font-semibold mb-2 text-white">Find Doctor</h3>
                    <div className="h-1 w-16 bg-white mx-auto mb-4"></div>
                    <p className="text-white flex-grow text-lg">
                        Connect with certified healthcare professionals instantly. Get
                        expert consultations and find the right doctor based on your
                        needs.
                    </p>
                    <Link to="/finddoctor" className="text-white mt-4 underline">Find</Link>
                </div>

                {/* Column 4 */}
                <div className="bg-blue-900 p-6 text-center flex flex-col rounded-r-lg md:rounded-r-lg h-fit md:h-[300px]">
                    <h3 className="text-2xl font-semibold mb-2 text-white">Read Blogs</h3>
                    <div className="h-1 w-16 bg-blue-300 mx-auto mb-4"></div>
                    <p className="text-white flex-grow text-lg">
                        Stay informed with the latest trends in AI, healthcare, and
                        technology. Explore expert-written blogs for insights and updates.
                    </p>
                    <Link to="/blogs" className="text-blue-300 mt-4 underline">Learn more</Link>
                </div>
            </div>
        </section>

      {/* Section 3 */}
      <section className="py-12 px-6 md:px-24 w-full bg-white-100 mt-[300px] md:mt-[300px]">
        <div className="container mx-auto text-center">
          {" "}
          {/* Center the content */}
          <h2 className="text-5xl font-bold mb-8">Our Services</h2>{" "}
          {/* Section heading */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-blue-100 rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500 rounded-full w-28 h-28 flex items-center justify-center">
                  <img src={img1} alt="Service 1 Icon" className="w-28 h-28" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI-Powered Skin Analysis
              </h3>
              <p className="text-gray-700">
                Upload an image of your skin condition and get instant AI-driven
                insights. Our model detects acne, infections, rashes, and other
                concerns with high accuracy, helping you take early action.
              </p>
            </div>

            {/* Service Card 2 (Duplicate and modify as needed) */}
            <div className="bg-blue-100 rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500 rounded-full w-28 h-28 flex items-center justify-center">
                  <img
                    src={img2}
                    alt="Consultation Icon"
                    className="w-28 h-28"
                  />{" "}
                  {/* Added image tag */}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Dermatologist Consultation Assistance
              </h3>
              <p className="text-gray-700">
                Get AI-generated pre-consultation reports to help you
                communicate effectively with dermatologists. Our system provides
                structured summaries to streamline expert diagnosis.
              </p>
            </div>

            {/* Service Card 3  */}
            <div className="bg-blue-100 rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500 rounded-full w-28 h-28 flex items-center justify-center">
                  <img src={img3} alt="Detection Icon" className="w-28 h-28" />{" "}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Skin Disease Detection & Risk Assessment
              </h3>
              <p className="text-gray-700">
                Identify potential skin diseases and assess their severity
                through AI-based analysis. The system categorizes risks and
                provides guidance on whether professional consultation is
                needed.
              </p>
            </div>

            {/* service card 4 */}
            <div className="bg-blue-100 rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500 rounded-full w-28 h-28 flex items-center justify-center">
                  <img src={img4} alt="Progress Icon" className="w-28 h-28" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Progress Tracking & Treatment Monitoring
              </h3>
              <p className="text-gray-700">
                Monitor skin changes over time with periodic scans. Track the
                effectiveness of treatments and receive AI-driven insights on
                improvements or worsening conditions.
              </p>
            </div>

            {/* service card 5 */}
            <div className="bg-blue-100 rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500 rounded-full w-28 h-28 flex items-center justify-center">
                  <img src={img5} alt="Library Icon" className="w-28 h-28" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Educational Skin Health Library
              </h3>
              <p className="text-gray-700">
                Explore a rich collection of expert-backed articles, case
                studies, and guides on skin health, treatments, and prevention
                strategies to stay informed.
              </p>
            </div>

            {/* service card 6 */}
            <div className="bg-blue-100 rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500 rounded-full w-28 h-28 flex items-center justify-center">
                  <img src={img6} alt="Community Icon" className="w-28 h-28" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Community Support & Forums
              </h3>
              <p className="text-gray-700">
                Engage with a supportive community where users share
                experiences, seek advice, and discuss skincare concerns. Get
                insights from skincare experts and AI-powered discussions.
              </p>
            </div>
          </div>
          {/* Button below the cards */}
          <div className="text-center mt-8">
            {" "}
            {/* Center the button container */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="py-8 px-6 md:px-24 w-full bg-blue-100 relative">
        {" "}
        {/* Reduced py value */}
        <div className="container mx-auto flex flex-col md:flex-row items-start">
          {/* Left Side: Mission and Values */}
          <div className="md:w-1/2">
            <div className="mb-6">
              {" "}
              {/* Reduced margin bottom */}
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-blue-700 text-justify text-lg">
                At Skinspect, our mission is to revolutionize skincare through
                AI-driven technology. We strive to empower individuals by
                providing accurate, accessible, and early skin health
                assessments. Our goal is to bridge the gap between technology
                and dermatology, enabling users to monitor their skin conditions
                effortlessly and make informed decisions about their health. By
                leveraging cutting-edge artificial intelligence, we aim to make
                skincare diagnostics affordable, reliable, and available to
                everyone, anytime and anywhere.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Values:</h2>
              <ul className="list-disc pl-6 text-blue-700 space-y-3 text-lg">
                {" "}
                {/* Reduced space-y value */}
                <li>
                  <strong>Innovation & Accuracy:</strong> We are committed to
                  continuous innovation, ensuring that our AI-powered skin
                  analysis remains precise, effective, and scientifically
                  reliable.
                </li>
                <li>
                  <strong>Accessibility & Inclusivity:</strong> Skincare is for
                  everyone. We strive to make advanced dermatological insights
                  available to all, regardless of location or financial
                  background.
                </li>
                <li>
                  <strong>User-Centric Approach:</strong> Our technology is
                  built around user needs, ensuring a seamless, intuitive, and
                  secure experience for all.
                </li>
                <li>
                  <strong>Ethical AI & Data Privacy:</strong> We prioritize
                  ethical AI practices and user privacy, ensuring that data is
                  protected and used responsibly.
                </li>
                {/* <li>
                  <strong>Empowerment & Awareness:</strong> We believe in
                  educating users about skin health, helping them take proactive
                  steps toward healthier skin.
                </li> */}
              </ul>
            </div>
          </div>

          {/* Right Side: Doctor Image */}
          <div className="md:w-1/2 md:pl-16 mt-6 md:mt-0 flex justify-end">
            <img
              src={doctor}
              alt="Doctor"
              className="max-w-full h-auto -mb-6"
            />
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section
        className="py-12 px-6 md:px-24 w-full relative"
        style={{
          backgroundImage: `url(${bg4})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          {/* Left Side: Content */}
          <div className="md:w-1/2 text-black text-center md:text-left md:pr-16 ml-16 mt-16">
            <h2 className="text-5xl font-bold mb-4">
              We Believe in a <br /> Healthy Skin of You
            </h2>
            <div className="text-lg py-6 text-justify">
              <p>
                At Skinspect, we prioritize your skin’s health and well-being.
                Our AI-driven technology empowers you to take control of your
                skincare journey by providing accurate analysis, early detection
                of skin concerns, and expert-backed insights. We believe that
                healthy skin is not just about appearance—it’s about confidence,
                self-care, and overall well-being. With advanced AI analysis,
                dermatologist consultations, and personalized tracking, we
                ensure that you have the tools and knowledge to maintain
                radiant, problem-free skin. Whether it’s detecting early signs
                of skin conditions or guiding you towards the right care,
                Skinspect is your trusted partner for healthier skin. Because
                your skin deserves the best care—anytime, anywhere!
              </p>
            </div>
          </div>

          {/* Right Side: Single Image */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end mr-8">
            {" "}
            <img
              src={collage}
              alt="Collage"
              className="max-w-[500px] h-auto "
            />{" "}
            {/* Rounded corners */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
