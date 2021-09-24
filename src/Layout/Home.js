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
import { listCards, listDecks } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);

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
  }, [])

  return (
    <>
      <Header />
      <main className="container">
      {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <div class="row">
              <div class="col-2">
                <button type="button" class="btn btn-secondary" onClick={createDeckClicked}>
                  <i class="fas fa-plus"></i> Create Deck
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
            <CreateDeck />
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
