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

class NeighborhoodTest extends Component {


  constructor () {
    super();
    this.state = {
      users: {},
      currentLocation: {},
      // text: []
    }
  }


  componentDidMount(){
      base.fetch('users', {
        context: this,
        asArray: true })
        .then(response => this.setState({ users: response }))

        const addressId = this.props.match.params.id;
          axios.get(` https://maps.googleapis.com/maps/api/geocode/json?place_id=${addressId}&key=AIzaSyCmStoy8C78sZ6lX2BvPYK3UuwYfx_CvhE`)
          // .then(response => console.log(response.data.results[0].geometry.location))
          .then(response => this.setState({ currentLocation: response.data.results[0].geometry.location }))

  }

  filterStuff() {
    if (this.state.users[0]) {
    let currentLocation = this.state.currentLocation
    let allUsers = this.state.users
    console.log(allUsers, currentLocation);
    const acceptableDistance = 0.01

    let filteredUsers = allUsers.filter(users => {
      let lat = users.address.location.lat
      let lng = users.address.location.lng
      console.log(lat, lng); //prints all the users lats and lngs

      let latResult = Math.abs(currentLocation.lat - lat)
      let lngResult = Math.abs(currentLocation.lng - lng)
      return (latResult <= acceptableDistance && lngResult <= acceptableDistance)
    })
     console.log(filteredUsers);
  }
}

  render() {
    return (
      <div>
        {this.filterStuff()}
      </div>
    )}
}

export default NeighborhoodTest;
