import React, { Component } from 'react';
import axios from 'axios';


class Weather extends Component {


  constructor () {
    super();
    this.state = {
      currentWeather: {},
    }
  }


componentDidMount() {
  this.getWeather(this.props.location)
}

getWeather(location) {
    axios.get(`http://api.wunderground.com/api/24532f7c67079974/conditions/q/${location.lat},${location.lng}.json`)
    .then(response => console.log(response))
      // this.setState({ currentWeather: response.data.current_observation }))
}


  render () {
      const location = this.props.location
      if (this.state.currentWeather.city) {
      return (
        <div className='large-profile'>
          <p>{this.state.currentWeather.city}</p>
        </div>

      )
    } else {
      return <div></div>
    }
    }
  }




export default Weather;
