import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class Map extends Component {


  render () {
    const address = this.props.addressResult
    const lat = this.props.addressResult.geometry.location.lat
    const lng = this.props.addressResult.geometry.location.lng
    const markers = this.props.markers || []
    console.log(address);

    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: lat, lng: lng }} >
        {markers.map((marker, index) => (
          <Marker {...marker} />
          )
        )}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(Map);
