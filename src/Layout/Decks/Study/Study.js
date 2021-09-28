import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listCards, readDeck } from "../../../utils/api";
import BreadcrumbBar from "../../BreadcrumbBar";
import Card from "./Card";

function Study() {
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deck, setDeck] = useState({name: "", id: 0});
    const { deckId } = useParams();
    const PAGE_NAME = "Study";

    useEffect(() => {
        async function loadCards() {
            const cardsFromAPI = await listCards(deckId);
            setCards(cardsFromAPI);
        }
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDeck(deckFromAPI);
        }
        loadCards();
        loadDeck();
    }, [deckId])

    // todo: use readDeck() more?
    const navLinks = [
        {text: "Home", url: "/"},
        {text: deck.name, url: `/decks/${deck.id}`},
    ]

    if (cards.length > 0) {
        return (
            <div>
                <BreadcrumbBar links={navLinks} currentPage={PAGE_NAME} />
                <h2>{PAGE_NAME}: {deck.name}</h2>
                <Card 
                    card={cards[currentIndex]} 
                    currentIndex={currentIndex} 
                    setCurrentIndex={setCurrentIndex} 
                    total={cards.length} 
                />
            </div>
        );
    } else {
        return (
            <div>
                <BreadcrumbBar links={navLinks} currentPage={PAGE_NAME} />
                <h2>{PAGE_NAME}: {deck.name}</h2>
            </div>
        );
    }
    
}

export default Study;