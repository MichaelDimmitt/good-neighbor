import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home'
import ChatBox from './ChatBox'
import base from '../rebase';

window.base = base;

class Neighborhood extends Component {


  constructor () {
    super();
    this.state = {
      users: {},
      currentLocation: {},
      currentUser: {},
      filteredUsers: [],
      text: []

    }
  }


  componentDidMount(){
    base.fetch('users', {
      context: this,
      asArray: true })
      .then(response => this.setState({ users: response }))

    const addressId = this.props.match.params.id;
      axios.get(` https://maps.googleapis.com/maps/api/geocode/json?place_id=${addressId}&key=AIzaSyCmStoy8C78sZ6lX2BvPYK3UuwYfx_CvhE`)
      .then(response => this.setState({ currentLocation: response.data.results[0].geometry.location }))

    base.onAuth(this.setUserState.bind(this));

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
    // console.log(allUsers, currentLocation);
    const acceptableDistance = 0.01

    let filteredUsers = allUsers.filter(users => {
      let lat = users.address.location.lat
      let lng = users.address.location.lng
      let latResult = Math.abs(currentLocation.lat - lat)
      let lngResult = Math.abs(currentLocation.lng - lng)
      return (latResult <= acceptableDistance && lngResult <= acceptableDistance)
    })
    console.log(filteredUsers)
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
                <a href={`mailto:${user.email}`}><button className="waves-effect waves-light btn">Email</button></a> <button className="waves-effect waves-light btn" onClick={this.addChatBox.bind(this, user)}>Chat</button>
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
// {this.state.currentUser.displayName}

addChatBox(user){
  console.log(user);
   <ChatBox />
}



  render() {
    return (
      <div>
        {this.filterStuff()}
      </div>
    )}
}

export default Neighborhood;
