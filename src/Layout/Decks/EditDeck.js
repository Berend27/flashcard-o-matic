import React, { useEffect, useState } from "react";
import { 
    Link,
    useHistory, 
    useParams, 
} from "react-router-dom";
import { 
    readDeck,
    updateDeck, 
} from "../../utils/api";
import DeckForm from "./DeckForm";

function EditDeck({ setDataUpdated }) {
    const [deck, setDeck] = useState({});

    const deckId = useParams().deckId;
    const history = useHistory();
    const previous = `/decks/${deckId}`;

    const handleCancel = () => history.goBack();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateDeck(deck);
        setDataUpdated(true);
        history.goBack();
    }

    setDataUpdated(false);

    useEffect(() => {
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDeck(deckFromAPI);
        }
        loadDeck();
    }, [deckId])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item"><Link to={previous}>{deck.name}</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <div class="row">
                <h2 class="ml-3">Edit Deck</h2>
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

export default EditDeck;