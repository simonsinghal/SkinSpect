import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Skinspect from "../Images/Skinspect.png";
import InfluencerCarousel from "./InfluencerCarousel"; 
import ArticleGrid from "./ArticleGrid"; 
import blogbg from "../Images/blogbg.png";
import Footer from "./Footer";

const Blog = () => {
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

      {/* Blog Image Section */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${blogbg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="text-white text-6xl font-bold z-10">BLOG</h1>
      </section>

      {/* Influencer Carousel Section */}
      <section className="py-16 bg-blue-200">
        <div className="container mx-auto px-4 bg-blue-200">
          <InfluencerCarousel />
        </div>
      </section>

      {/* Article Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ArticleGrid />
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default Blog;
