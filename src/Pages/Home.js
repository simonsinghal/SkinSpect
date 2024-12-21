import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';
import Logo from '../Images/Logo.png';
import Skinspect from '../Images/Skinspect.png';
import BackgroundImage from '../Images/BackgroundImage.png';
import Icon from '../Images/Icon.png';

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src={Logo} className="logo-image" alt="Logo" />
          <img src={Skinspect} className="logo-text" alt="Skinspect" />
        </div>
        <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <section 
        className="main-content" 
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="content-wrapper">
        <img src={Icon} className="icon-image" alt="Icon" />
          <h2 className='heading'>YOUR SKIN HEALTH SIMPLIFIED WITH AI</h2>
          <p>
            24/7 Online Skin Disease Analysis By Uploading Image File, Audio File and Prescription
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
