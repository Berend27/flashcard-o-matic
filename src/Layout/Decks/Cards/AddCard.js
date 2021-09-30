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

    const initialFormState = {
        front: "",
        back: "",
    }

    const [card, setCard] = useState(initialFormState);

    const handleDone = () => {
        history.push(`/decks/${deckId}`);
        history.go(0);
    }

    const handleSave = async (event) => {
        event.preventDefault();
        setCard({
            ...card,
            deckId: deckId,
            id: Math.floor(Math.random() * 100000)
        })
        await createCard(deckId, card);
        history.go(0);
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