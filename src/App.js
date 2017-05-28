import React, { Component } from 'react';
import Neighborhood from './components/Neighborhood';
import ZillowNeighborhoods from './components/ZillowNeighborhoods';
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class App extends Component {



  render() {
    return (
      <Router>
        <div>
          {/* <Route exact path="/" component={Home}/> */}
          <Route exact path="/" component={Home}/>
          <Route exact path="/:id" component={ZillowNeighborhoods}/>
        </div>
      </Router>
    );
  }
}

export default App;
