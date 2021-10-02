import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, updateCard } from "../../../utils/api";
import BreadcrumbBar from "../../BreadcrumbBar";
import CardForm from "./CardForm";

function EditCard({ deck }) {
    const cardId = useParams().cardId;
    const history = useHistory();

    const navLinks = [
        {text: "Home", url: "/"},
        {text: deck.name, url: `/decks/${deck.id}`},
    ]
    const PAGE_NAME = "Edit Card";

    const [card, setCard] = useState({});

    const handleDone = () => {
        history.push(`/decks/${deck.id}`);
        history.go(0);
    }

    const handleSave = async (event) => {
        event.preventDefault();
        await updateCard(card);
        history.go(0);
    }

    useEffect(() => {
        const abortController = new AbortController();

        async function loadCard() {
            const cardFromAPI = await readCard(cardId, abortController.signal)
            setCard(cardFromAPI);
        }
        loadCard();

        return () => abortController.abort();
    }, [cardId]) 

    return (
        <div>
            <BreadcrumbBar links={navLinks} currentPage={`${PAGE_NAME} ${cardId}`} />
            <h2>Edit Card</h2>
            <CardForm card={card} setCard={setCard} handleDone={handleDone} handleSave={handleSave} />
        </div>
    )
}

export default EditCard;