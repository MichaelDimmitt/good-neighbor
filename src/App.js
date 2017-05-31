import React, { Component } from 'react';
import ZillowNeighborhoods from './components/ZillowNeighborhoods';
import Home from './components/Home';
import base from './rebase';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class App extends Component {



//grabs the address from the endpoint so that I can send it to ZillowNeighborhoods
//for the events/weather components

componentDidMount(){
  base.onAuth(user => {
    if(user) {
      base.listenTo(`users/${user.uid}/address`, {
        context: this,
        asArray: true,
        then(response){
          this.setState({ address: response })
        .catch(error => {
          console.log(error)
        })
        }
      }
    )}
  })
}


  constructor() {
    super();
    this.state = {
      address: {}
    }
  }


  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>

          <Route exact path="/:id" render={(defaultProps)=> <ZillowNeighborhoods
              {...defaultProps}
              address={this.state.address}
            />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
