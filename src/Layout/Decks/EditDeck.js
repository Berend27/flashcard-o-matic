import React, { useEffect, useState } from "react";
import { 
    useHistory, 
    useParams, 
} from "react-router-dom";
import { 
    readDeck,
    updateDeck, 
} from "../../utils/api";
import BreadcrumbBar from "../BreadcrumbBar";
import DeckForm from "./DeckForm";

function EditDeck({ setDataUpdated }) {
    const [deck, setDeck] = useState({});

    const deckId = useParams().deckId;
    const history = useHistory();
    const navLinks = [
        {text: "Home", url: "/"},
        {text: deck.name, url: `/decks/${deck.id}`},
    ]
    const pageName = "Edit Deck";

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
        <div>
            <BreadcrumbBar links={navLinks} currentPage={pageName} />
            <div className="row">
                <h2 className="ml-3">{pageName}</h2>
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

export default EditDeck;