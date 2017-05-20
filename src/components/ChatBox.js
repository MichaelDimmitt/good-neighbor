import React, { Component } from 'react';
import Neighborhood from './Neighborhood';
var $ = window.jQuery = require('jquery');
import materialize from 'materialize-css';
window.Vel = require('materialize-css/js/velocity.min')
import base from '../rebase';
var firebase = require('firebase');

window.base = base;

class ChatBox extends Component {

  constructor(props, context) {
    super(props, context)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
      message: '',
      messages: []
    }
  }


componentDidMount() {
  $('.modal').modal();

  firebase.database().ref('messages/').on('value', (snapshot) =>{

    const currentMessages = snapshot.val()

    if (currentMessages != null){
      this.setState({
        messages: currentMessages
      })
    }
  })
}

updateMessage(event) {
  this.setState({
    message: event.target.value
  })
}

submitMessage(event) {
  const nextMessage = {
    id: this.state.messages.length,
    text: this.state.message
  }

  firebase.database().ref('messages/'+nextMessage.id).set(nextMessage)
  // let list = Object.assign([], this.state.messages)
  // list.push(nextMessage)
  // this.setState({
  //   messages: list
  // })
}

  render() {
    // console.log(this.props.user),
    // console.log(this.props.currentUser)

    const currentMessage = this.state.messages.map((message, i) => {
      return(
        <li key={message.id}>{message.text}</li>
      )
    })

    return (
      <div className='container'>
        <h5 className='center-align'>{this.props.user.name}</h5>
          <ol>
            {currentMessage}
          </ol>
        <input onChange={this.updateMessage} type="text" placeholder="Message" id="message"/>
        <br />
        <button onClick={this.submitMessage} className="waves-effect waves-light btn" id="message-button" type="submit">Submit</button>
      </div>
    )
  }
}

export default ChatBox
