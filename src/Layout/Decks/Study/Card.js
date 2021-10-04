import React, { useState } from "react";

function Card({ card, currentIndex, setCurrentIndex, setFinished, total }) {
    const [showFront, setShowFront] = useState(true);
    
    const flip = () => {
        setShowFront(!showFront);
    }
    const showNextCard = () => {
        flip();
        if (currentIndex < total - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setFinished(true);
        }
    }

    const visibleText = showFront ? card.front : card.back;

    return (
        <div className="row">
            <div className="card col m-3 pl-0 pr-0">
                <div className="card-body">
                    <h3>Card {currentIndex + 1} of {total}</h3>
                    <p>{visibleText}</p>
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={(event) => { 
                            flip();  
                            event.target.blur();
                        }
                    }>Flip</button>
                    { !showFront && <button type="button" className="btn btn-primary ml-2" onClick={showNextCard}>
                        Next
                    </button> }
                </div>
            </div>
        </div>
    )
}

export default Card;