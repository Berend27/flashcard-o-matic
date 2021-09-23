import React, { useEffect, useState } from "react";
import { listCards, readDeck } from "../../utils/api";
import { 
    Link,
    useHistory, 
    useParams 
} from "react-router-dom";
import Card from "./Card";

function Deck({ deck = {}}) {
    const [cards, setCards] = useState([]);

    const listStyle = {
        listStyle: "none",
        paddingLeft: "0"
    }

    const deckId = useParams().deckId;

    useEffect(() => {
        async function loadCards() {
            const cardsFromAPI = await listCards(deckId);
            setCards(cardsFromAPI);
        }
        loadCards();
    }, [deckId])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <div class="mb-3">
                <h3>Deck Name</h3>
                <p>Description</p>
                <div class="d-flex justify-content-between">
                    <div>
                      <button type="button" class="btn btn-secondary mr-2">Edit</button>
                      <button type="button" class="btn btn-primary mr-2">Study</button>
                      <button type="button" class="btn btn-primary mr-2"><i class="fa-solid fa-plus"></i> Add Cards</button>
                    </div>
                    <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
            <h2>Cards</h2>
            <ul style={listStyle}>
                {cards.map((card, index) => (
                    <li key={index}><Card card={card} /></li>
                ))}
            </ul>
        </>
    )
}

export default Deck;