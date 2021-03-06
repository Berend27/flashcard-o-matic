import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Layout/Home";

/**
 * App is a wrapper for <Home>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
