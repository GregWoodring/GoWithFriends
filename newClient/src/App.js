import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

//components
import GameBody from './components/game/GameBody'
import LobbyBody from './components/lobby/LobbyBody';

//for testing
// import Board from './components/game/board/Board'




function App() {
  return (
    <Router
    >
          <div
            className='App'
            >
              <Switch>
                <Route path="/" exact component={LobbyBody} />
                <Route path="/game/:roomId" component={GameBody} />
              </Switch>
          </div>
    </Router>
  );
}

export default App;
