import React, { Component } from 'react';
import firebase from 'firebase'
import Header from './Header'
// import ChatInput from './ChatInput'
// import ChatMessage from './ChatMessage'

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      user: null,
      count: 0
    }
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({ user: user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email}`))
    .catch(error => console.error(`Error: ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
    .then(()=> console.log('you are disconnected'))
    .catch(error => console.error(`Error: ${error.code}: ${error.message}`))
  }

  // handleSendMessage (text) {
  //   const messageDB = firebase.database().ref().child('messages')
  //
  //   let newUserMessage = messageDB.push()
  //   let msg = {
  //     text,
  //     avatar: this.state.user.photoURL,
  //     displayName: this.state.user.displayName,
  //     date: Date.now()
  //   }
  //   newUserMessage.set(msg)
  // }

  // renderMessage () {
  //   if(this.state.user) {
  //     return this.state.messages.map(msg => {
  //       <ChatMessage message={msg} />
  //     }).reverse()
  //   }
  // }



  render() {
    return (
      <div>
        <Header
          appName='Good Neighbor'
          user={this.state.user}
          onAuth={this.handleAuth.bind(this)}
          onLogout={this.handleLogout.bind(this)}
        />
        {/* <div className='message-chat-list container'>
          <br /><br />
          {this.rendermessage()}
        </div>
        <ChatInput
          onSendMessage={this.handleSendMessage.bind(this)}
        /> */}
      </div>
    );
  }
}

export default App;
