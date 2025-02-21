import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Features from './Pages/Features';
import Blog from './Pages/Blog';
import About from './Pages/About';
import FAQ from './Pages/FAQ';
import ImageAnalysis from './Pages/ImageAnalysis';
import TextAnalysis from './Pages/TextAnalysis';
import FindDoctor from './Pages/FindDoctor';
import DoctorsResult from './Pages/DoctorsResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/imageanalysis" element={<ImageAnalysis />} />
        <Route path="/textanalysis" element={<TextAnalysis />} />
        <Route path="/finddoctor" element={<FindDoctor />} />
        <Route path="/doctorsresult" element={<DoctorsResult/>} />
      </Routes>
    </Router>
  );
}

export default App;
