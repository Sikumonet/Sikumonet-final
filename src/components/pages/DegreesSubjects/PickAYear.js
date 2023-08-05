import React from "react";
import CardItem from "../CardItem";
import '../Cards.css'

function PickAYear(){
    return(
        <div className='cards'>
            <h1>Choose a year</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                            src="images/One.png"
                            text="Freshman Year"
                            label="One"
                            path='/computerScience'
                        />
                        <CardItem
                            src="images/Two.png"
                            text="Sophomore Year"
                            label="Two"
                            path='/computerScience'
                        />
                        <CardItem
                            src="images/Three.png"
                            text="Junior Year"
                            label="Three"
                            path='/computerScience'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PickAYear
