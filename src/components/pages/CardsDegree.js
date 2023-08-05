import React from "react";
import CardItem from "./CardItem";
import './Cards.css'

function CardsDegree(){
    return(
        <div className='cards'>
            <h1>Choose your Degree</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                            src="images/Computer-Science.jpeg"
                            text="Computer Science"
                            label="College"
                            path='/pickAYear'
                        />
                        <CardItem
                            src="images/Psychology.png"
                            text="Psychology"
                            label="University"
                            path='/pickAYear'
                        />
                        <CardItem
                            src="images/Electrical-Engineering.jpeg"
                            text="Electrical-Engineering"
                            label="University"
                            path='/pickAYear'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CardsDegree
