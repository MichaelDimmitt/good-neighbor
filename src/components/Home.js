import React, { Component } from 'react';
import axios from 'axios';
import Map from './Map'
import ZillowNeighborhoods from './ZillowNeighborhoods';
import Favorites from './Favorites';
import Profile from './Profile';
import Header from './Header';
import Footer from './Footer';
import base from '../rebase';
import gju from 'geojson-utils';
var data = require('/Users/tylerdavis/TIY/neighborhood.json');
window.Vel = require('materialize-css/js/velocity.min')
import logo5 from '../../public/images/Logo2-01.png'



window.base = base;

class Home extends Component {

  constructor () {
    super();
    this.state = {
      user: {},
      searchResult: {},
      users: [],
      address: {},
      neighborhood: {}
    }
  }


  componentDidMount () {
    base.onAuth(this.setUserState.bind(this));
  }


  setUserState (user) {
    this.setState({
      user: user || {},
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
      // this.neighborhoodSwitch = base.syncState(`neighborhoods/${user.uid}/`, {
      //   context: this,
      //   asArray: true,
      //   state: 'neighborhood'
      // });
      const userData = {name: user.displayName, pic: user.photoURL, email: user.email, uid: user.uid}
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
      return null
    } else {
      return (
      <div className='logo-container center-align'>
        <div className='col s12 m6'>
          <img
            className='logo'
            src={logo5} />
        <br />
          <button className="waves-effect waves-light btn" onClick={this.login.bind(this)}>Login</button>
      </div>
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
        <div className='outer-container'>
          <div className='map-container'>
            <span onClick={this.closeMap.bind(this)} className="close btn right">&times;</span>
            <h5>{result.formatted_address}</h5>
            <br />
               <Map
                 addressResult={result}
                 center={result.geometry.location}
                 zoom={17}
                 markers={[marker]}
                 addAddress={this.addAddress.bind(this)}
                 containerElement={<div id='containerElement' />}
                 mapElement={<div id='mapElement' />}
                />
        </div>
      </div>
      )
    } else {
      return null
    }
  }

  closeMap() {
    this.setState({
      searchResult: {},
    })
  }


  addAddress(address){
    const lng = address.geometry.location.lng
    const lat = address.geometry.location.lat

    const neighborhood = data.features.find(location => {
      return gju.pointInPolygon({"type":"Point","coordinates":[ lng, lat ]},
                    {"type":"Polygon", "coordinates":[location.geometry.coordinates[0]]})
    });

    // console.log(neighborhood);

    const addressData = {name: address.formatted_address, location: address.geometry.location, lat: address.geometry.location.lat, lng: address.geometry.location.lng, id: address.place_id}
      this.setState({
        address: addressData,
      })
    const neighborhoodData = {city: neighborhood.properties.City, name: neighborhood.properties.Name, id: neighborhood.properties.RegionID}
      this.setState({
        neighborhood: neighborhoodData,
      })
      this.test(neighborhood);
}


test(neighborhood) {

  console.log(neighborhood);
  console.log(this.state.users);
  base.push(`neighborhoods/${neighborhood.properties.RegionID}`, {
     data: { name: this.state.users}
  })

}





  displayNeighborhoods() {
    if(this.state.address && this.state.user.uid && this.state.neighborhood) {
      const address = this.state.address
      const neighborhood = this.state.neighborhood
      return (
          <div className='favorites left z-depth-4'>
            <Favorites
              address={address}
              neighborhood={neighborhood}
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
              logout={this.logout.bind(this)}
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
      <div>
        <div className='home'>
            {this.loginOrLogoutButton()}
            {this.displayHeader()}
          <div className='row'>
            <div className='col s12'>
              {this.displayProfile()}
              {this.displayNeighborhoods()}
              {/* {this.findNeighborhood()} */}
            </div>
          </div>
            {this.formIfLoggedIn()}
            {this.displaySearchResults()}
          </div>
          {this.displayFooter()}
          {/* <ZillowNeighborhoods
            currentLocation={this.state.address}
          /> */}
      </div>
    )
  }
}

export default Home;
