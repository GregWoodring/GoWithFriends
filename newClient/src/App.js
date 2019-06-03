import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import uuidvi from 'uuid/v1';

//components
import GameBody from './components/game/GameBody'
import LobbyBody from './components/lobby/LobbyBody';

//for testing
// import Board from './components/game/board/Board'




class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      userId: uuidvi()
    }
  }

  render(){
    return (
      <Router
      >
            <div
              className='App'
              >
                <Switch>
                  <Route path="/" exact 
                  render={(props) => <LobbyBody userId={this.state.userId} />}
                   />
                  <Route path="/game/:roomId" 
                  render={(props) => <GameBody userId={this.state.userId} />}
                  />
                </Switch>
            </div>
      </Router>
    );
  }
}

export default App;
