import React, { Component } from 'react';
var $ = window.jQuery = require('jquery');
import logoHeader from '../../public/images/logo-smile-white.svg'
window.Vel = require('materialize-css/js/velocity.min')


class Header extends Component {

  componentDidMount() {
    $(".button-collapse").sideNav();
  }


  render() {
    const user = this.props.user
    return(
        <nav>
          <div className="nav-wrapper">
            <a href='/'><div className='left hide-on-med-and-down header-hood'>{this.props.neighborhood.name} {this.props.neighborhood.city}</div></a>
            <a href="/" className="brand-logo center">
              <img
                className='logo'
                alt='logo'
                src={logoHeader} />
            </a>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down header-links">
              <li><a href="/">Home</a></li>
              <li><a onClick={this.props.logout}>Log Out</a></li>
              <li>
                <img
                  width='32'
                  alt='avatar'
                  className='avatar circle repsonsive-img'
                  src={user.photoURL}/> {user.displayName}
              </li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><a href="/">Home</a></li>
              <li><a onClick={this.props.logout}>Log Out</a></li>
            </ul>
          </div>
        </nav>
    )
  }
}

export default Header
