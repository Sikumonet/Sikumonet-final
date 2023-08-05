import React from "react";
import CardItem from "../CardItem";
import '../Cards.css'

function ComputerScience(){
    return(
        <div className='cards'>
            <h1>Choose a Subject</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                            src="images/Calculus.png"
                            text="Calculus"
                            label="A"
                            path='/Upload'
                        />
                        <CardItem
                            src="images/Calculus.png"
                            text="Calculus"
                            label="B"
                            path='/Upload'
                        />
                        <CardItem
                            src="images/C++.png"
                            text="C++"
                            path='/Upload'
                        />
                        <CardItem
                            src="images/JavaScript.png"
                            text="JavaScript"
                            path='/Upload'
                        />
                        <CardItem
                            src="images/DataStructure.png"
                            text="Data Structures"
                            path='/Upload'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ComputerScience
