import React, { Component } from 'react';
import { Link } from 'react-router-dom'



class Favorites extends Component {


  render () {
      const address = this.props.address;
      return (
        <div>
          <div className='fav-title'>Saved Address</div>
          <div className='fav-text'>
          <Link to={`${address[0]}`}>{address[2]}</Link>
        </div>
        </div>
      )
    }
}



export default Favorites;
