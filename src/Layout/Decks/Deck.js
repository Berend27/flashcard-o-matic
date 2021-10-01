import React, { useEffect, useState } from "react";
import { deleteCard, listCards, readDeck } from "../../utils/api";
import { 
    Route,
    Switch,
    useHistory, 
    useParams,
    useRouteMatch, 
} from "react-router-dom";
import ButterflyCardList from "./ButterflyCardList";
import AddCard from "./Cards/AddCard";
import BreadcrumbBar from "../BreadcrumbBar";
import EditCard from "./Cards/EditCard";

function Deck({ deleteDeckClicked }) {
    const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState({});

    const deckId = useParams().deckId;
    const history = useHistory();
    const { url } = useRouteMatch();

    const navLinks = [
        {text: "Home", url: "/"},
    ]

    const handleAddCards = () => history.push(`${url}/cards/new`);
    const handleDeleteCard = async (card) => {
        if (window.confirm("Delete this card?")) {
            await deleteCard(card.id);
            history.go(0);
        } 
    }
    const handleEdit = () => history.push(`${url}/edit`);
    const handleEditCard = (card) => {
        history.push(`${url}/cards/${card.id}/edit`);
    }
    const handleStudy = () => history.push(`${url}/study`)

    useEffect(() => {
        async function loadCards() {
            try {
                const cardsFromAPI = await listCards(deckId);
                setCards(cardsFromAPI);
            } catch (error) {
                console.log(error);
            }
        }
        async function loadDeck() {
            try {
                const deckFromAPI = await readDeck(deckId);
                setDeck(deckFromAPI);
            } catch (error) {
                console.log("deck not found");
                console.log(error);
                history.push("/decknotfound");
            }
        }

        loadDeck();
        loadCards();
    }, [deckId, history])

    return (
        <Switch>
            <Route path="/decks/:deckId/cards/new">
                <AddCard deck={deck} />
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
                <EditCard deck={deck} />
            </Route>
            <Route>
                <BreadcrumbBar links={navLinks} currentPage={deck.name} />
                <div className="mb-3">
                    <h3>{deck.name}</h3>
                    <p>{deck.description}</p>
                    <div className="d-flex justify-content-between">
                        <div>
                        <button type="button" className="btn btn-secondary mr-2" onClick={handleEdit}>Edit</button>
                        <button type="button" className="btn btn-primary mr-2" onClick={handleStudy}>Study</button>
                        <button type="button" className="btn btn-primary mr-2" onClick={handleAddCards}>
                            <i className="fas fa-plus"></i> Add Cards
                        </button>
                        </div>
                        <button 
                            type="button" 
                            className="btn btn-danger" 
                            onClick={(event) => {
                                    deleteDeckClicked(deckId);
                                    event.currentTarget.blur();
                                }
                            }>
                                <i className="far fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                <ButterflyCardList cards={cards} handleDeleteCard={handleDeleteCard} handleEditCard={handleEditCard}/>
            </Route>
        </Switch>
    )
}

export default Deck;