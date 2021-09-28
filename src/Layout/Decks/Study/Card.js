import React, { useState } from "react";

function Card({ card, currentIndex, setCurrentIndex, total }) {
    const [showFront, setShowFront] = useState(true);
    
    // todo: show Next button when the backside is shown
    const flip = () => {
        setShowFront(!showFront);
    }

    const visibleText = showFront ? card.front : card.back;

    return (
        <div className="row">
            <div className="card col m-3 pl-0 pr-0">
                <div className="card-body">
                    <h3>Card {currentIndex + 1} of {total}</h3>
                    <p>{visibleText}</p>
                    <button type="button" class="btn btn-secondary" onClick={flip}>Flip</button>
                </div>
            </div>
        </div>
    )
}

export default Card;