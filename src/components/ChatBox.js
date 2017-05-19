import React, { Component } from 'react';
import Neighborhood from './Neighborhood';
var $ = window.jQuery = require('jquery');
import materialize from 'materialize-css';
window.Vel = require('materialize-css/js/velocity.min')
import base from '../rebase';

window.base = base;

class ChatBox extends Component {

componentDidMount() {

  $('.modal').modal();

}


  render() {
    console.log(this.props.user),
    console.log(this.props.currentUser)

    return (
      <div className='container'>
        <h4>{this.props.user.name}</h4>
        <input type="text" placeholder="Message" id="message"/>
        <button className="waves-effect waves-light btn" id="message-button" type="submit">Submit</button>
      </div>
    )
  }
}

export default ChatBox
