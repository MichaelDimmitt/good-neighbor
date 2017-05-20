import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home'
import ChatBox from './ChatBox'
import base from '../rebase';
var $ = window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min')
import materialize from 'materialize-css';

window.base = base;

class Neighborhood extends Component {


  constructor () {
    super();
    this.state = {
      users: {},
      currentLocation: {},
      currentUser: {},
      filteredUsers: [],
      text: [],

      chatDisplay: {
        display: true,
        selectedUser: {}
      }

    }
  }

// display: false

  componentDidMount(){
    base.fetch('users', {
      context: this,
      asArray: true })
      .then(response => this.setState({ users: response }))

    const addressId = this.props.match.params.id;
      axios.get(` https://maps.googleapis.com/maps/api/geocode/json?place_id=${addressId}&key=AIzaSyCmStoy8C78sZ6lX2BvPYK3UuwYfx_CvhE`)
      .then(response => this.setState({ currentLocation: response.data.results[0].geometry.location }))

    base.onAuth(this.setUserState.bind(this));

    $('.modal').modal();
  }

  setUserState (currentUser) {
    this.setState({
      currentUser: currentUser || {}
    });
  }


  filterStuff() {
    if (this.state.users[0]) {
    let currentLocation = this.state.currentLocation
    let allUsers = this.state.users
    const acceptableDistance = 0.01

    let filteredUsers = allUsers.filter(users => {
      let lat = users.address.location.lat
      let lng = users.address.location.lng
      let latResult = Math.abs(currentLocation.lat - lat)
      let lngResult = Math.abs(currentLocation.lng - lng)
      return (latResult <= acceptableDistance && lngResult <= acceptableDistance)
    })
    // console.log(filteredUsers)
    let currentUserName = this.state.currentUser.displayName
    return (
      <div>
        <h5 className='center-align'><strong>Other users in this Neighborhood:</strong></h5>
        <ul>
          {filteredUsers.map((user) => {
            if(currentUserName == user.name) {
              return null
            } else {
              return  (
                <div className='container'>
                  <li className='section'>{user.name}
                    <img
                    width='32'
                    className='avatar circle repsonsive-img'
                    src={user.pic} />
                    <br />
                    <br />
                    <a href={`mailto:${user.email}`}><button className="waves-effect waves-light btn">Email</button></a> <button data-target="modal1" className="waves-effect waves-light btn" onClick={this.buttonClick.bind(this, user)}>Chat</button>
                    <br />
                    <br />
                    <div className='divider'></div>
                  </li>
                </div>
              )
            }
          })}
        </ul>
      </div>
    )
  }
}

showChatBox(){
  if (this.state.chatDisplay.display) {
    return (
      <ChatBox
        user={this.state.chatDisplay.selectedUser}
        currentUser={this.state.currentUser}
      />
    )
  } else {
  return null
  }
}


buttonClick (user){
  this.setState({ chatDisplay: {display: this.state.chatDisplay.display, selectedUser: user}})
}

// display: !this.state.chatDisplay.display

  render() {
    return (
      <div>
        {this.filterStuff()}
        <div id="modal1" className="modal">
          {this.showChatBox()}
        </div>
      </div>
    )}
}

export default Neighborhood;
