import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import BreadcrumbBar from "../../BreadcrumbBar";
import Card from "./Card";

function Study() {
    const [deck, setDeck] = useState({name: "", id: 0});
    const { deckId } = useParams();
    const PAGE_NAME = "Study";

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
            <BreadcrumbBar links={navLinks} currentPage={PAGE_NAME} />
            <h2>{PAGE_NAME}: {deck.name}</h2>
            <Card />
        </div>
    )
}

export default Study;