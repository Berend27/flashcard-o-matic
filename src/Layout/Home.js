import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import CreateDeck from "./Decks/CreateDeck";
import Deck from "./Decks/Deck";
import DeckOverview from "./DeckOverview";
import EditDeck from "./Decks/EditDeck";
import Study from "./Decks/Study/Study";
import { deleteDeck, listDecks } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState([false]);

  const history = useHistory();

  const createDeckClicked = () => history.push("/decks/new");
  const deleteDeckClicked = async (id) => {
    if (window.confirm("Delete this deck?\nYou will not be able to recover it.")) {
      await deleteDeck(id);
      setUpdateTrigger(!updateTrigger);
    }
  }

  const listStyle = {
    listStyle: "none",
    paddingLeft: "0"
}

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      const response = await listDecks(abortController.signal);
      const decksFromAPI = response;
      for (let deck of decksFromAPI) {
        deck.count = deck.cards ? deck.cards.length : 0;
      }
      setDecks(decksFromAPI);
    }
    loadDecks();

    return () => abortController.abort();
  }, [updateTrigger])

  return (
    <div>
      <Header />
      <main className="container">
        <Switch>
          <Route exact={true} path="/">
            <div className="row">
              <div className="col-2">
                <button type="button" className="btn btn-secondary" onClick={createDeckClicked}>
                  <i className="fas fa-plus"></i> Create Deck
                </button>
              </div>
            </div>
            <ul style={listStyle}>
              {decks.map((deck, index) => (
                <li key={index}><DeckOverview count={deck.count} deck={deck} handleDelete={deleteDeckClicked}/></li>
              ))}
            </ul>
          </Route>
          <Route path = "/decks/new">
            <CreateDeck updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger} />
          </Route>
          <Route path = "/decks/:deckId/edit">
            <EditDeck updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger} />
          </Route>
          <Route path = "/decks/:deckId/study">
            <Study />
          </Route>
          <Route path = "/decks/:deckId">
            <Deck deleteDeckClicked={deleteDeckClicked} updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default Home;
