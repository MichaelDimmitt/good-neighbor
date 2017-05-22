import React, { Component } from 'react';

class Header extends Component {

  render() {
    const user = this.props.user

    return(
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li><a href=""></a></li>
          <li><a href=""></a></li>
          <li className="divider"></li>
          <li><a href="">Log Out</a></li>
        </ul>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">Logo</a>
            <ul className="right hide-on-med-and-down">
              <li>
                <img
                  width='32'
                  className='avatar circle repsonsive-img'
                  src={user.photoURL}/> {user.displayName}
              </li>
              {/* <li><a href="badges.html">Components</a></li> */}
              <li><a className="dropdown-button" href="#!" data-activates="dropdown1"><i className="material-icons right">arrow_drop_down</i></a></li>
            </ul>
          </div>
        </nav>



      </div>
    )
  }

}

export default Header
