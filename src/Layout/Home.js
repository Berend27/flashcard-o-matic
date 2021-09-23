import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import CreateDeck from "./Decks/CreateDeck";
import Deck from "./Decks/Deck";

function Home() {
  const history = useHistory();

  const createDeckClicked = () => history.push("/decks/new");

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
            <div class="row">
              <div class="card col-5 m-3 pl-0 pr-0">
                <div class="card-header d-flex justify-content-between">
                  <h3>Deck Name</h3>
                  <p>N cards</p>
                </div>
                <div class="card-body">
                  <p>Todo: dynamically set this text</p>
                  <div class="d-flex justify-content-between">
                    <div >
                      <button type="button" class="btn btn-secondary mr-2"><i class="fas fa-eye"></i> View</button>
                      <button type="button" class="btn btn-primary"><i class="fas fa-book"></i> Study</button>
                    </div>
                    <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                  </div>
                </div>
              </div>
            </div>
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
