import React, { Component } from 'react';
import axios from 'axios';
import Map from './Map'
import Favorites from './Favorites';
import Profile from './Profile';
import Header from './Header';
import Footer from './Footer';
import base from '../rebase';
var $ = window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min')
import materialize from 'materialize-css';


window.base = base;

class Home extends Component {

  constructor () {
    super();
    this.state = {
      user: {},
      searchResult: {},
      users: [],
      address: {}
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
      this.addressSwitch = base.syncState(`users/${user.uid}/address`, {
        context: this,
        asArray: true,
        state: 'address'
      });
      this.userSwitch = base.syncState(`users/${user.uid}`, {
        context: this,
        asArray: true,
        state: 'users'
      });
      const userData = {name: user.displayName, pic: user.photoURL, email: user.email}
      this.setState({
        users: userData
      })

    }
  }


  login () {
    base.authWithOAuthPopup('google', function (){});
  }

  logout () {
    base.unauth()
    base.removeBinding(this.addressSwitch);
    base.removeBinding(this.userSwitch);
  }

  loginOrLogoutButton () {
    if (this.state.user.uid) {
      return <button className="waves-effect waves-light btn log-out" onClick={this.logout.bind(this)}>Logout</button>
    } else {
      return (
      <div className='log-in container center-align'>
        <div className='container pitch'>
          <h1>Good Neighbor</h1>
          <h5>An app that helps connect you with your neighbors.</h5>
        </div>
        <br />
        <button className="waves-effect waves-light btn" onClick={this.login.bind(this)}>Login</button>
      </div>
      )
    }
  }


  formIfLoggedIn () {
    if (this.state.user.uid) {
      return (
        <div className="container search">
        <form onSubmit={this.searchGoogleMaps.bind(this)}>
          <input
            type='search'
            className='center-align search-text'
            placeholder='Search address here...'
            ref={element => this.addressName = element} />
          {/* <button className="waves-effect waves-light btn">Search for your Neighbors</button> */}
        </form>
      </div>
      )
    }
  }


  searchGoogleMaps (event) {
    event.preventDefault();
    const address = this.addressName.value;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCmStoy8C78sZ6lX2BvPYK3UuwYfx_CvhE`)
    .then(response => this.setState({ searchResult: response.data.results[0] }));
    this.addressName.value = '';
  }


  displaySearchResults () {
    if (this.state.searchResult.geometry && this.state.user.uid) {
      const result = this.state.searchResult;
      const marker = { position: result.geometry.location }

      return (
        <div>
          <h5>{result.formatted_address}</h5>
          <div className='map'>
             <Map
               addressResult={result}
               center={result.geometry.location}
               zoom={16}
               markers={[marker]}
               addAddress={this.addAddress.bind(this)}
               containerElement={<div style={{ height: `100%` }} />}
               mapElement={<div style={{ height: `100%` }} />}
              />
          </div>
        </div>
      )
    } else {
      return null
    }
  }


  addAddress(address){
    const addressData = {name: address.formatted_address, location: address.geometry.location, id: address.place_id}
      this.setState({
        address: addressData,
      })
}


  displayNeighborhoods() {
    if(this.state.address && this.state.user.uid) {
      const result = this.state.address
      return (
          <div className='favorites left z-depth-4'>
            <Favorites
              address={result}
            />
          </div>
      )
    }
  }

  displayProfile(){
    if(this.state.user.uid) {
      const user = this.state.user
      return (
          <div className='profile left z-depth-4'>
            <Profile
              user={user}
            />
          </div>
      )
    }
  }

  displayHeader (){
    if(this.state.user.uid) {
      const user = this.state.user
      return (
            <Header
              user={user}
            />
      )
    }
  }

  displayFooter(){
    if(this.state.user.uid) {
      return (
          <Footer
          />
      )
    }
  }



  render() {
    return (
      <div className='col s12'>
        <div className='home'>
            {this.loginOrLogoutButton()}
            {this.displayHeader()}
          <div className='row'>
            <div className='col s12'>
              {this.displayProfile()}
              {this.displayNeighborhoods()}
            </div>
          </div>
          {this.formIfLoggedIn()}
          <div className="container">
            {this.displaySearchResults()}
          </div>
          </div>
          {this.displayFooter()}
      </div>
    )
  }
}

export default Home;
