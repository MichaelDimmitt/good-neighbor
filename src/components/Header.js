import React, { Component } from 'react';

class Header extends Component {

  render() {
    const user = this.props.user

    return(
      <div>
           <img
             width='32'
             className='avatar circle repsonsive-img'
             src={user.photoURL} />
         <div>{user.displayName}</div>
      </div>
    )
  }

}

export default Header
