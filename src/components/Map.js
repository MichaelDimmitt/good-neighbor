import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";



class Map extends Component {


  handleClick(address){
    this.props.addAddress(address)
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
        <div className="row center-align">
          <br />
          <div className="col s12 m12">
            <button className="waves-effect waves-light btn"
            onClick={this.handleClick.bind(this, address)}>Set Location as Address</button>
            <br /><br />
          </div>
        </div>
      </GoogleMap>
    )
  }
}

export default withGoogleMap(Map);
