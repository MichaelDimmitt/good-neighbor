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
    axios.get(`https://api.wunderground.com/api/24532f7c67079974/conditions/q/${location.lat},${location.lng}.json`)
    .then(response => this.setState({ currentWeather: response.data.current_observation }))
}


  render () {
      return (
        <div className='large-profile center-align'>
          <h5><u>Forecast</u></h5>

          {this.state.currentWeather.display_location &&
          <div>{this.state.currentWeather.display_location.full}</div>
          }
          <br />
          {this.state.currentWeather &&
          <div>
            <div><u>Temperature:</u> {this.state.currentWeather.temp_f}&deg;F</div>
            <div><u>Weather:</u> {this.state.currentWeather.weather}</div>
            <img src={this.state.currentWeather.icon_url}/>
          </div>
          }
        </div>
      )
    }
  }




export default Weather;
