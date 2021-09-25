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
import { listCards, listDecks } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);
  const [dataUpdated, setDataUpdated] = useState([false]);

  const history = useHistory();

  const createDeckClicked = () => history.push("/decks/new");

  const listStyle = {
    listStyle: "none",
    paddingLeft: "0"
}

  useEffect(() => {
    async function loadDecks() {
      const decksFromAPI = await listDecks();
      for (let deck of decksFromAPI) {
        const cards = await listCards(deck.id);
        deck.count = cards.length;
      }
      setDecks(decksFromAPI);
    }
    loadDecks();
  }, [dataUpdated])

  return (
    <>
      <Header />
      <main className="container">
      {/* TODO: Study button and Delete button in DeckOverview */}
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
                <li key={index}><DeckOverview deck={deck} /></li>
              ))}
            </ul>
          </Route>
          <Route path = "/decks/new">
            <CreateDeck setDataUpdated={setDataUpdated} />
          </Route>
          <Route path = "/decks/:deckId/edit">
            <EditDeck setDataUpdated={setDataUpdated} />
          </Route>
          <Route path = "/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default Home;
