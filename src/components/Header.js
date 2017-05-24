import React, { Component } from 'react';

class Header extends Component {

  render() {
    const user = this.props.user

    return(
      <div className='grey lighten-4'>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">Good Neighbor</a>
            <ul className="right hide-on-med-and-down">
              <li>
                <img
                  width='32'
                  className='avatar circle repsonsive-img'
                  src={user.photoURL}/> {user.displayName}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }

}

export default Header
