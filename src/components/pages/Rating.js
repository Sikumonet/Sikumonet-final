import React, {useState} from "react";
import './Rating.css'
import {AiFillStar,AiOutlineStar} from "react-icons/ai";




export default function Rating(){
    const [number,setNumber] = useState(0)
    const [hoverStar, setHoverStar] = useState(undefined)
    const handlePlaceHolder = () => {
        switch (number || hoverStar){
            case 0:
                return 'Comment here...'
            case 1:
                return 'What was the problem in the summary?'
            case 2:
                return 'What can be improved in the summary?'
            case 3:
                return 'What was not good in the summary?'
            case 4:
                return 'Please provide a feedback'
            case 5:
                return 'Tell us why it is so perfect? '
            default:
                return 'Comment here...'
        }
    }
    const handleText = () => {
        switch (number || hoverStar){
            case 0:
                return 'Evaluate';
            case 1:
                return 'Not good';
            case 2:
                return 'Ok';
            case 3:
                return 'Good';
            case 4:
                return 'Very Good';
            case 5:
                return 'Perfect!';
            default:
                return "Evaluate";
        }
    };
    return (
        <div className="Rating">
            <div className="popup">
                <div className="content">
                    <div className="product">
                        <img style={{width:60, height:60,objectFit:'cover'}} src="https://basmo.app/wp-content/uploads/2021/10/how-to-write-a-book-summary-1-1024x579.gif" alt="name"/>
                        <h1>Rate the Summary!</h1>
                    </div>
                    <div>
                        <h1>{handleText()}</h1>
                        {Array(5)
                            .fill()
                            .map((_,index) =>
                            number >= index + 1 || hoverStar >= index + 1 ? (
                            <AiFillStar
                                onMouseOver={() => setHoverStar(index + 1)}
                                onMouseLeave={() => setHoverStar(undefined)}
                                style={{ color:"orange"}} />
                        ) : (
                                <AiOutlineStar
                                    // onMouseOver={() => setHoverStar(index + 1)}
                                    // onMouseLeave={() => setHoverStar(undefined)}
                                    style={{color:'orange'}}
                                    onClick={() => setNumber(index + 1)}/>
                            )
                        )}
                    </div>
                    <textarea placeholder={handlePlaceHolder()}></textarea>
                    <button className={` ${!number && "disable"}`}>Submit</button>
                </div>
            </div>
        </div>
    )
}
