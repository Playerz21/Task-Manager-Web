import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddTaskPage from "./AddTaskPage";
import CreatePage from "./CreatePage";
import ListPage from "./ListPage";

export default function HomePage(props) {
  const renderHomePage = () => {
    return (
      <div>
        <p>Nothing</p>
      </div>
    );
  };
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return renderHomePage();
          }}
        />
        <Route path="/create" component={CreatePage} />
        <Route path="/add/:code" component={AddTaskPage} />
        <Route path="/list" component={ListPage} />
      </Switch>
    </Router>
  );
}

const appdiv = document.getElementById("app");
render(<HomePage />, appdiv);
