import React from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/pages/Home";
import Upload from "./components/pages/Upload";
import Rating from "./components/pages/Rating";
import Login from "./components/pages/Login";
import Navbar from "./components/Navbar";
import './App.css'

function App() {
  return (
    <>
        <Router>
      <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/rating" element={<Rating />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    </>
  );
}

export default App;
