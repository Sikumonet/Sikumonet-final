import React from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/pages/Home";
import Upload from "./components/pages/Upload";
import Rating from "./components/pages/Rating";
import Login from "./components/pages/Login";
import Navbar from "./components/Navbar";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import CardsDegree from "./components/pages/CardsDegree";
import PickAYear from "./components/pages/DegreesSubjects/PickAYear";
import ComputerScience from "./components/pages/DegreesSubjects/ComputerScience";

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
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cardsDegree" element={<CardsDegree />} />
                <Route path="/pickAYear" element={<PickAYear />} />
                <Route path="/computerScience" element={<ComputerScience />} />

            </Routes>
        </Router>
    </>
  );
}

export default App;
