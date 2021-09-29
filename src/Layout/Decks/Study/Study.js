import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listCards, readDeck } from "../../../utils/api";
import BreadcrumbBar from "../../BreadcrumbBar";
import Card from "./Card";

function Study() {
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deck, setDeck] = useState({name: "", id: 0});
    const [finished, setFinished] = useState(false);
    const { deckId } = useParams();
    const history = useHistory();
    const PAGE_NAME = "Study";

    function restart() {
        setCurrentIndex(0);
        setFinished(false);
    }

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
    }, [deckId]);

    useEffect(() => {
        if (finished) {
            // show modal
            if (window.confirm("Restart cards?")) {
                restart();
            } else {
                history.push("/");
            }
        }
    }, [finished]);

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
                    setFinished={setFinished}
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