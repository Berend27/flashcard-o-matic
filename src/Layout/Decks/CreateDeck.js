import React, { useState } from "react";
import { createDeck } from "../../utils/api";
import { 
    useHistory, 
} from "react-router-dom";
import BreadcrumbBar from "../BreadcrumbBar";
import DeckForm from "./DeckForm";

function CreateDeck({ setDataUpdated }) {
    const initialFormState = {
        name: "",
        description: "",
    };

    const navLinks = [
        {text: "Home", url: "/"},
    ]

    const [deck, setDeck] = useState({ ...initialFormState });

    const history = useHistory();

    const handleCancel = () => history.push("/");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDeck({
            ...deck,
            id: Math.floor(Math.random() * 10000)
        })
        await createDeck(deck);
        setDataUpdated(true);
        history.push(`/decks/${deck.id}`);
    }

    setDataUpdated(false);

    return (
        <div>
            <BreadcrumbBar links={navLinks} currentPage="Create Deck" />
            <div className="row">
                <h2 className="ml-3">Create Deck</h2>
            </div>
            <DeckForm 
                deck={deck}
                setDeck={setDeck}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default CreateDeck;