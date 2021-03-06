import React from "react";
import ButterflyCard from "./ButterflyCard";

function ButterflyCardList({cards, handleDeleteCard, handleEditCard}) {
    const listStyle = {
        listStyle: "none",
        paddingLeft: "0"
    }

    return (
        <div>
            <h2>Cards</h2>
            <ul style={listStyle}>
            {cards.map((card, index) => (
                    <li key={index}><ButterflyCard card={card} handleDeleteCard={handleDeleteCard} handleEditCard={handleEditCard} /></li>
                ))}
            </ul>
        </div>
    );
}

export default ButterflyCardList;