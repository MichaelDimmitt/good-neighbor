import React, { Component } from 'react';
import Neighborhood from './components/Neighborhood';
import NeighborhoodTest from './components/NeighborhoodTest';
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {



  render() {
    return (
      <Router>
        <div>
          {/* <Route exact path="/" component={Home}/> */}
          <Route exact path="/" component={Home}/>
          <Route exact path="/:id" component={NeighborhoodTest}/>
        </div>
      </Router>
    );
  }
}

export default App;
