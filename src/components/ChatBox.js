import React, { Component } from 'react';
import Neighborhood from './Neighborhood';
var $ = window.jQuery = require('jquery');
import materialize from 'materialize-css';
window.Vel = require('materialize-css/js/velocity.min')
import base from '../rebase';
var firebase = require('firebase');

window.base = base;

class ChatBox extends Component {

  constructor() {
    super()
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
    text: this.state.message,
    username: this.props.currentUser.displayName,
    pic: this.props.currentUser.photoURL,
    key: this.props.currentUser.uid+this.props.userKey,
    otherKey: this.props.userKey+this.props.currentUser.uid,
    time: firebase.database.ServerValue.TIMESTAMP
  }
  $('#message').val('');
  event.preventDefault()


  firebase.database().ref(`messages/${nextMessage.id}`).set(nextMessage)
  // base.push(`messages/${nextMessage.uid}`, {test: nextMessage})

}


  render() {
    const uniqueKey = this.props.currentUser.uid+this.props.userKey
    const reverseUniqueKey = this.props.userKey+this.props.currentUser.uid

    const currentMessage = this.state.messages.map((message, i) => {
      if(message.key === uniqueKey || message.otherKey === uniqueKey) {
      return(
        <li key={message.id}>
          {message.username} <img
          width='32'
          className='avatar circle repsonsive-img'
          src={message.pic}/>: {message.text}
        </li>
      )
    } else {
      return null
    }
    })

    return (
      <div className='container'>
        <h5 className='center-align'>{this.props.user.name}</h5>
          <ul>
            {currentMessage}
          </ul>
          <div className="modal-footer">
          <form>
        <input onChange={this.updateMessage.bind(this)} type="text" placeholder="Message" id="message"/>
        <br />
        <button onClick={this.submitMessage.bind(this)} className="waves-effect waves-light btn" id="message-button" type="submit">Submit</button>
      </form>
    </div>

      </div>
    )
  }
}

export default ChatBox
