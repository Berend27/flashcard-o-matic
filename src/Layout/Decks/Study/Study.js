import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import BreadcrumbBar from "../../BreadcrumbBar";
import Card from "./Card";

function Study() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deck, setDeck] = useState({cards: []});
    const [finished, setFinished] = useState(false);
    const { deckId } = useParams();
    const history = useHistory();
    const PAGE_NAME = "Study";

    const goToAddCards = () => history.push(`/decks/${deckId}/cards/new`)

    function restart() {
        setCurrentIndex(0);
        setFinished(false);
    }

    useEffect(() => {
      const abortController = new AbortController();
        async function loadDeck() {
          try {
            const deckFromAPI = await readDeck(deckId, abortController.signal);
            setDeck(deckFromAPI);
          } catch (error) {
            console.log(error);
          } 
        }
        loadDeck();
      
      return () => abortController.abort();
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
    }, [finished, history]);

    const navLinks = [
        {text: "Home", url: "/"},
        {text: deck.name, url: `/decks/${deck.id}`},
    ]

    if (deck.cards.length > 2) {
        return (
            <div>
                <BreadcrumbBar links={navLinks} currentPage={PAGE_NAME} />
                <h2>{PAGE_NAME}: {deck.name}</h2>
                <Card 
                    card={deck.cards[currentIndex]} 
                    currentIndex={currentIndex} 
                    setCurrentIndex={setCurrentIndex} 
                    setFinished={setFinished}
                    total={deck.cards.length} 
                />
            </div>
        );
    } else {
        return (
            <div>
                <BreadcrumbBar links={navLinks} currentPage={PAGE_NAME} />
                <h2>{PAGE_NAME}: {deck.name}</h2>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
                <button type="button" className="btn btn-primary" onClick={goToAddCards}>
                    <i className="fas fa-plus"></i> Add Cards
                </button>
            </div>
        );
    }
    
}

export default Study;