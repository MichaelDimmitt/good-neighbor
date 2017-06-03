import React, { Component } from 'react';
var $ = window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min')
import base from '../rebase';
var firebase = require('firebase');
import moment from 'moment';


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

  firebase.database().ref(`neighborhoods/${this.props.id}/messages`).on('value', (snapshot) =>{
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
    key: this.props.currentUser.uid+this.props.userKey, //key is current user's uid + the other user uid
    revKey: this.props.userKey+this.props.currentUser.uid, //revkey is other user uid + current user uid
    time: firebase.database.ServerValue.TIMESTAMP
  }
  this.message.value = ''
  this.message.placeholder = ''
  event.preventDefault()

  firebase.database().ref(`neighborhoods/${this.props.id}/messages/${nextMessage.id}`).set(nextMessage)
}


  render() {
    const uniqueKey = this.props.currentUser.uid+this.props.userKey
    //in order for users to talk exclusively with one another, the conditionals
    //is checking if the current user is talking to other user = uniqueKey or
    //the other user is talking to the current user
    const currentMessage = this.state.messages.map((message, i) => {
      if(message.key === uniqueKey || message.revKey === uniqueKey) {
        return(
          <div className='messages'>
            <li key={message.id}>
              <img
              width='32'
              className='avatar circle repsonsive-img'
              alt='avatar'
              src={message.pic}/> <strong>{message.username}:</strong> {message.text}<span className='right'>{moment(message.time).format('HH:mm a')}</span>
            </li>
          </div>
        )
      } else {
        return null
      }
    })

    return (
      <div className='container'>
        <h5 className='center-align'>{this.props.user.name}</h5>
        <ul className='chatbox-messages'>
          {currentMessage}
        </ul>
          <form className='input-field'>
            <input onChange={this.updateMessage.bind(this)} type="text" placeholder="Message" id="message" ref={ele => this.message = ele}/>
              <br />
            <button onClick={this.submitMessage.bind(this)} className="waves-effect waves-light btn" id="message-button" type="submit">Send</button>
          </form>
        </div>
    )
  }
}

export default ChatBox
