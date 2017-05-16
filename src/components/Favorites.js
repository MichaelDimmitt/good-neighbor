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
        <li className="">
          <Link to={`${address.id}`}>{address.name}</Link>
        </li>
      )
    }
}



export default Favorites;
