import React, { Component } from 'react';
import axios from 'axios';
import Map from './Map'
import Favorites from './Favorites';
import base from '../rebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

window.base = base;

class Home extends Component {

  constructor () {
    super();
    this.state = {
      user: {},
      searchResult: {},
      users: [],
      addresses: []
    }
  }


  componentDidMount () {
    base.onAuth(this.setUserState.bind(this));
  }


  setUserState (user) {
    this.setState({
      user: user || {}
    });
    if (user) {
      base.syncState(`users/${user.uid}/addresses`, {
        context: this,
        asArray: true,
        state: 'addresses'
      });
      // base.syncState(`users/${user.uid}/users`, {
      //   context: this,
      //   asArray: true,
      //   state: 'users'
      // });
    }
  }

  // componentWillUnmount () {
  //   base.removeBinding(this.offSwitchForUsers);
  //   base.removeBinding(this.offSwitchForProjects);
  // }

  login () {
    base.authWithOAuthPopup('google', function (){});
  }

  logout () {
    base.unauth()
  }

  loginOrLogoutButton () {
    if (this.state.user.uid) {
      return <button className="waves-effect waves-light btn" onClick={this.logout.bind(this)}>Logout</button>
    } else {
      return <button className="waves-effect waves-light btn" onClick={this.login.bind(this)}>Login</button>
    }
  }


  formIfLoggedIn () {
    if (this.state.user.uid) {
      return (
        <form onSubmit={this.searchGoogleMaps.bind(this)}>
          <input
            placeholder='Address'
            ref={element => this.addressName = element} />
          <button className="waves-effect waves-light btn">Search for your Neighbors</button>
        </form>
      )
    }
  }


  searchGoogleMaps (event) {
    event.preventDefault();
    const address = this.addressName.value;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCmStoy8C78sZ6lX2BvPYK3UuwYfx_CvhE`)
    .then(response => this.setState({ searchResult: response.data.results[0]/*.geometry.location*/ }));
    this.addressName.value = '';
  }


  displaySearchResults () {
    if (this.state.searchResult.geometry) {
      const result = this.state.searchResult;
      return (
        <div>
          <h5>{result.formatted_address}</h5>
          <div className="map">
             <Map
               addressResult={this.state.searchResult}
               center={this.state.searchResult.geometry.location}
               zoom={16}
               addAddress={this.addAddress.bind(this)}
               containerElement={<div style={{ height: `100%` }} />}
               mapElement={<div style={{ height: `100%` }} />}
              />
          </div>
        </div>
      )
    }
  }


  addAddress(address){
    const addressData = {name: address.formatted_address, location: address.geometry.location, id: address.place_id}
      this.setState({
        addresses: this.state.addresses.concat(addressData)
      })
}





  displayNeighborhoods() {
    if(this.state.addresses) {
      console.log(this.state.addresses);
      const results = this.state.addresses
      // const addressName = this.state.addresses.map(p => p.name);
      // console.log(projectId);
      return (
        <div>
          <h5><strong>Neighborhoods</strong></h5>
          <ul>
            {results.map((address, index) => {
              return <Favorites key={index} address={address} />
            }
            )}
          </ul>
        </div>
      )
    }
  }




  render() {
    return (
        <div>
          <div className="log">
            {this.loginOrLogoutButton()}
          </div>
          <div className="row">
            <div className="col s2 Favorites">
              {this.displayNeighborhoods()}
            </div>
            <div className="col s10">
              {this.formIfLoggedIn()}
              {this.displaySearchResults()}
            </div>
          </div>
        </div>
    );
  }
}

export default Home;
