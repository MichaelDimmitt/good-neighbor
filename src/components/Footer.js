import React, { Component } from 'react';
import logoFooter from '../../public/images/Zillow_Logo_HoodsProvided_RightAligned.gif'


class Footer extends Component {

  render() {
    return(
        <footer className="page-footer">
          <div className="footer-copyright">
            <div className="container">
            © 2017 Copyright Tyler Davis
            <img
              width='130'
              className='repsonsive-img right'
              alt='zillow logo'
              src={logoFooter} />
            </div>
          </div>
        </footer>
      )
    }
  }

export default Footer;
