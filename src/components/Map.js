import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



class Map extends Component {
  


  handleClick(address){
    this.props.addAddress(address)
}


  addButton(address){
    return <button className="waves-effect waves-light btn"
      onClick={this.handleClick.bind(this, address)}>Set Location as Address</button>
  }



  render () {
    const address = this.props.addressResult
    const markers = this.props.markers

    return (
      <GoogleMap
        zoom={this.props.zoom}
        center={this.props.center} >

        {markers.map((marker, index) => (
          <Marker {...marker}
          />
          )
        )}
        <div className="row">
          <br />
          <div className="col s6">{this.addButton(address)}</div>
          <div><Link to={address.place_id}><button className="waves-effect waves-light btn col s6">Go to Location</button></Link></div>
        </div>
      </GoogleMap>

    )
  }
}

export default withGoogleMap(Map);
