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
        updateCard(card);
        history.go(0);
    }

    useEffect(() => {
        async function loadCard() {
            const cardFromAPI = await readCard(cardId)
            setCard(cardFromAPI);
        }
        loadCard();
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