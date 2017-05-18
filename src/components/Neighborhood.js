import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import base from '../rebase';

window.base = base;

class Neighborhood extends Component {


  constructor () {
    super();
    this.state = {
      users: {},
      currentLocation: {},
      currentUser: {},
      filteredUsers: []
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

    return (
      <div>
        <h6>User's nearby {this.state.currentUser.displayName}:</h6>
        <ul>
          {filteredUsers.map((user) => {
            // console.log(user)
            return <li>{user.name}</li>
          })}
        </ul>
      </div>
    )

  }
}





  render() {
    return (
      <div>
        {this.filterStuff()}
      </div>
    )}
}

export default Neighborhood;
