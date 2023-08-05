import React from "react";
import CardItem from "./CardItem";
import './Cards.css'

function Cards(){
    return(
        <div className='cards'>
            <h1>Choose your desired academic institution</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                        src="images/images.png"
                        text="The Academic College Of Tel Aviv"
                        label="College"
                        path='/CardsDegree'
                        />
                        <CardItem
                            src="images/Reichman.png"
                            text="Reichman University"
                            label="University"
                            path='/CardsDegree'
                        />
                        <CardItem
                            src="images/tau4.png"
                            text="Tel Aviv University"
                            label="University"
                            path='/CardsDegree'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
