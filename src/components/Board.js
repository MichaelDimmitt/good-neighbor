import React, { Component } from 'react';
var $ = window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min')
import base from '../rebase';
import moment from 'moment';
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
            src={post.pic}/> <strong>{post.username}</strong>
            <span className='right'>{moment(post.time).format('YYYY-MM-DD HH:mm a')}</span>
            <br />
            <br />
             {post.text}
          </li>
        </div>
      )
    }
  )

    return (
      <div className='board'>
        {/* <h4 className='center-align board-title'><strong>{this.props.neighborhood.name}, {this.props.neighborhood.city}</strong></h4> */}
        <h4 className='center-align board-title'><strong>Neighborhood Feed</strong></h4>
        <form className='input-field'>
          <img
            width='32'
            className='repsonsive-img'
            src={this.props.currentUser.photoURL}/>
          <input className='validate' onChange={this.updatePost.bind(this)} type="text" placeholder="Write your post here..." id="message"/>
          <br />
          <button onClick={this.submitPost.bind(this)} className="post-button right-align waves-effect waves-light btn" id="message-button" type="submit">Post</button>
        </form>
        <ul className='message-scroll'>
          {currentPost.reverse()}
        </ul>
      </div>
    )
  }
}

export default Board
