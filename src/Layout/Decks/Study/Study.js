import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import BreadcrumbBar from "../../BreadcrumbBar";

function Study() {
    const [deck, setDeck] = useState({name: "", id: 0});
    const { deckId } = useParams();

    useEffect(() => {
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDeck(deckFromAPI);
        }
        loadDeck();
    }, [deckId])

    // todo: use readDeck() more?
    const navLinks = [
        {text: "Home", url: "/"},
        {text: deck.name, url: `/decks/${deck.id}`},
    ]

    return (
        <div>
            <BreadcrumbBar links={navLinks} currentPage="Study" />
        </div>
    )
}

export default Study;