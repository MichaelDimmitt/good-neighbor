import React, { Component } from 'react';
import axios from 'axios';


class Weather extends Component {


constructor () {
  super();
  this.state = {
    currentWeather: {},
  }
}

componentWillReceiveProps(newProps) {
  this.getWeather(newProps.location)
}

getWeather(location) {
    axios.get(`http://api.wunderground.com/api/24532f7c67079974/conditions/q/${location.lat},${location.lng}.json`)
    .then(response => this.setState({ currentWeather: response.data.current_observation }))
}


  render () {
    console.log(this.state.currentWeather.display_location);
      return (
        <div className='large-profile'>
          <h5>Forecast</h5>
          {this.state.currentWeather.display_location &&
          <p>{this.state.currentWeather.display_location.full}</p>}
        </div>
      )
    }
  }




export default Weather;
