import React, { useEffect, useState } from "react";
import { listCards, readDeck } from "../../utils/api";
import { 
    Link,
    useHistory, 
    useParams,
    useRouteMatch, 
} from "react-router-dom";
import CardList from "./CardList";
// todo: Edit button functionality
// todo: Study button functionality
// todo: Add Cards functionality
function Deck() {
    const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState({});

    const deckId = useParams().deckId;
    const history = useHistory();
    const { url } = useRouteMatch();

    const handleEdit = () => history.push(`${url}/edit`);

    useEffect(() => {
        async function loadCards() {
            const cardsFromAPI = await listCards(deckId);
            setCards(cardsFromAPI);
        }
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDeck(deckFromAPI);
        }

        loadCards();
        loadDeck();
    }, [deckId])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <div class="mb-3">
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div class="d-flex justify-content-between">
                    <div>
                      <button type="button" class="btn btn-secondary mr-2" onClick={handleEdit}>Edit</button>
                      <button type="button" class="btn btn-primary mr-2">Study</button>
                      <button type="button" class="btn btn-primary mr-2"><i class="fas fa-plus"></i> Add Cards</button>
                    </div>
                    <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
            <CardList cards={cards} />
        </>
    )
}

export default Deck;