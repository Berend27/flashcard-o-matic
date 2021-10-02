import React, { useState } from "react";
import { 
    useHistory,
} from "react-router-dom";
import { createCard } from "../../../utils/api";
import BreadcrumbBar from "../../BreadcrumbBar";
import CardForm from "./CardForm";

function AddCard({ deck }) {
    const deckId = deck.id 
    const history = useHistory();
    const navLinks = [
        {text: "Home", url: "/"},
        {text: deck.name, url: `/decks/${deck.id}`},
    ]
    const PAGE_NAME = "Add Card";

    const initialCardState = {
        front: "",
        back: "",
        deckId: deckId,
    }

    const [card, setCard] = useState(initialCardState);

    const handleDone = () => {
        history.push(`/decks/${deckId}`);
        history.go(0);
    }

    const handleSave = async (event) => {
        const abortController = new AbortController();
        event.preventDefault();
        setCard(card)
        await createCard(deckId, card, abortController.signal);
        // the api gave the card an id property
        history.go(0);
        return abortController.abort();
    }

    return (
        <div>
            <BreadcrumbBar links={navLinks} currentPage={PAGE_NAME} />
            <div className="row">
                <h2 className="ml-3">{deck.name}: {PAGE_NAME}</h2>
            </div>
            <CardForm card={card} setCard={setCard} handleDone={handleDone} handleSave={handleSave} />
        </div>
    );
}

export default AddCard;