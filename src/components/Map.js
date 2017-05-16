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
      onClick={this.handleClick.bind(this, address)}>Add Location to Favorites</button>
  }



  render () {
    const address = this.props.addressResult
    const markers = this.props.markers || []

    return (
      <GoogleMap
        defaultZoom={this.props.zoom}
        defaultCenter={this.props.center} >
        {markers.map((marker, index) => (
          <Marker {...marker} />
          )
        )}
        <div>
          <p>{this.addButton(address)}</p>
          <Link to={address.place_id}><button className="waves-effect waves-light btn">Go to Location</button></Link>
        </div>
      </GoogleMap>

    )
  }
}

export default withGoogleMap(Map);
