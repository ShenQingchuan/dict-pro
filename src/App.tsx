import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Header></Header>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
