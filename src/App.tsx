import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import Header from './components/Header/Header';
import Home from './views/Home'

function App() {
  return (
    <div className="app">
      <Header></Header>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
