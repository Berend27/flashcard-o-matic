import React, { useState } from "react";
import { createDeck } from "../../utils/api";
import { 
    Link,
    useHistory, 
} from "react-router-dom";
import DeckForm from "./DeckForm";

function CreateDeck({ setDataUpdated }) {
    const initialFormState = {
        name: "",
        description: "",
    };

    const [deck, setDeck] = useState({ ...initialFormState });

    const history = useHistory();

    const handleCancel = () => history.push("/");

    const handleSubmit = async (event) => {
        event.preventDefault();
        deck.id = Math.floor(Math.random() * 10000);
        console.log(deck);
        await createDeck(deck);
        setDataUpdated(true);
        history.push(`/decks/${deck.id}`);
    }

    setDataUpdated(false);

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <div class="row">
                <h2 class="ml-3">Create Deck</h2>
            </div>
            <DeckForm 
                deck={deck}
                setDeck={setDeck}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
            />
        </>
    )
}

export default CreateDeck;