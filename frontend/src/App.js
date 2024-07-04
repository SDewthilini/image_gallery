//import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import About from './pages/About';
//import Contact from './pages/Contact';
import React from 'react';
// In your index.js or App.js file
import 'bootstrap/dist/css/bootstrap.min.css';

import Features from './pages/Features';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Gallery from './pages/Gallery';






function App() {
  return (
    
    <Router>
      <div>

      
        <Routes>
          <Route path="/" element={<Home/>} />
      
        </Routes>

        <Routes>
          <Route path="/Features" element={<Features />} />
        </Routes>

        <Routes>
          <Route path="/Signup" element={<Signup />} />
        </Routes>

        <Routes>
          <Route path="/Login" element={<Login />} />
        </Routes>

        <Routes>
          <Route path= "/Gallery" element={<Gallery/>} />
        </Routes>

        


      </div>
    </Router>
    
  );
}

export default App;
