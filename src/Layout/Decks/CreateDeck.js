import React, { useState } from "react";
import { createDeck } from "../../utils/api";
import { 
    useHistory, 
} from "react-router-dom";
import BreadcrumbBar from "../BreadcrumbBar";
import DeckForm from "./DeckForm";

function CreateDeck({ updateTrigger, setUpdateTrigger }) {
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
        setDeck(deck)
        try {
            // the api adds an id property to the deck
            const deckWithId = await createDeck(deck);
            setUpdateTrigger(!updateTrigger);
            history.push(`/decks/${deckWithId.id}`);
        } catch (error) {
            console.log(error);
            history.go(0);
        }
    }

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