import React, { Component } from 'react';
import { Link } from 'react-router-dom'



class Favorites extends Component {


  render () {
    const address = this.props.address;
    const neighborhood = this.props.neighborhood
    return (
      <div>
        <div className='fav-title'><strong>My Neighborhood</strong></div>
        <div className='fav-text'>
          <Link to={`${neighborhood.id}`}>{address[4]}</Link>
        </div>
      </div>
    )
  }
}



export default Favorites;
