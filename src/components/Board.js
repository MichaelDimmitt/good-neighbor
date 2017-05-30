import React, { Component } from 'react';
var $ = window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min')
import base from '../rebase';
var firebase = require('firebase');

window.base = base;

class Board extends Component {

  constructor() {
    super()
    this.state = {
      post: '',
      posts: []
    }
  }


componentDidMount() {

  firebase.database().ref(`neighborhoods/${this.props.id}/posts`).on('value', (snapshot) =>{

    const currentPosts = snapshot.val()

    if (currentPosts != null){
      this.setState({
        posts: currentPosts
      })
    }
  })
}

updatePost(event) {
  this.setState({
    post: event.target.value
  })
}

submitPost(event) {
  const nextPost = {
    id: this.state.posts.length,
    text: this.state.post,
    username: this.props.currentUser.displayName,
    pic: this.props.currentUser.photoURL,
    time: firebase.database.ServerValue.TIMESTAMP
  }
  $('#message').val('');
  event.preventDefault()


  firebase.database().ref(`neighborhoods/${this.props.id}/posts/${nextPost.id}`).set(nextPost)

}


  render() {
    const currentPost = this.state.posts.map((post, i) => {
      return(
        <div className='messages'>
        <li key={post.id}>
          <img
          width='65'
          className='repsonsive-img'
          src={post.pic}/> {post.username}: {post.text}
        </li>
      </div>
      )
    }
  )

    return (
      <div className=''>
        <h2 className='center-align board-title'>Public Message Board For {this.props.neighborhood.name}</h2>
        <h5 className='center-align'>{this.props.currentUser.name}</h5>
          <ul>
            {currentPost}
          </ul>
          <form>
        <input onChange={this.updatePost.bind(this)} type="text" placeholder="Message" id="message"/>
        <br />
        <button onClick={this.submitPost.bind(this)} className="waves-effect waves-light btn" id="message-button" type="submit">Submit</button>
      </form>

      </div>
    )
  }
}

export default Board
