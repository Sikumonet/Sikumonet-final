import React from "react";
import '../App.css'
import {Button} from "./Button";
import './HeroSection.css';

function HeroSection(){
    return(
        <div className='hero-container'>
            <h1>GET YOUR SUMMARY</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns">
                <Button
                    className='btns'
                    buttonStyle='btn--outline'
                    buttonSize='btn--large'
                >
                    Get Started
                </Button>
            </div>
        </div>
    )
}

export default HeroSection
