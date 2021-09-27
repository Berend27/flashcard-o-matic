import React from "react";
import Card from "./Card";

function CardList({cards}) {
    const listStyle = {
        listStyle: "none",
        paddingLeft: "0"
    }

    return (
        <div>
            <h2>Cards</h2>
            <ul style={listStyle}>
                {cards.map((card, index) => (
                    <li key={index}><Card card={card} /></li>
                ))}
            </ul>
        </div>
    );
}

export default CardList;