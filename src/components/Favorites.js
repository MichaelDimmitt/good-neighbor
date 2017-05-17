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
        <li className="section">
          <Link to={`${address.id}`}>{address.name}</Link>
        </li>
        <div className="divider"></div>
      </div>
      )
    }
}



export default Favorites;
