import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



class Favorites extends Component {


  render () {
      const address = this.props.address;
      return (
        <div>
          <h5>Address</h5>
          <Link to={`${address[0]}`}>{address[2]}</Link>
        </div>
      )
    }
}



export default Favorites;
