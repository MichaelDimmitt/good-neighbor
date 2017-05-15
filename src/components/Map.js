import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class Map extends Component {

  handleClick(address){
    this.props.addAddress(address)
}


  addButton(address){
      return <button className="waves-effect waves-light btn"
        onClick={this.handleClick.bind(this, address)}>Add Location</button>
  }


  render () {
    const address = this.props.addressResult
    let lat = this.props.addressResult.geometry.location.lat
    let lng = this.props.addressResult.geometry.location.lng
    const markers = this.props.markers || []
    // console.log(address);

    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: lat, lng: lng }} >
        {markers.map((marker, index) => (
          <Marker {...marker} />
          )
        )}
        <div>
        <p>{this.addButton(address)}</p>
      </div>
      </GoogleMap>

    )
  }
}

export default withGoogleMap(Map);
