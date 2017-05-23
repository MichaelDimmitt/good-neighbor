import React, { Component } from 'react';
import axios from 'axios';


class Events extends Component {


  constructor () {
    super();
    this.state = {
      localEvents: {},
    }
  }

  componentWillReceiveProps(newProps) {
    this.getEvents(newProps.location)
  }

  getEvents(location) {
      axios.get(`http://api.eventful.com/json/events/search?app_key=V5W6PxsWgHLxCZTb&where=28.64950019999999,-81.212549&within=25`)
      .then(response => console.log(response))
        // this.setState({ localEvents: response.events.event }))
  }


    render () {
      // console.log(this.state.localEvents);
        return (
          <div className='large-profile'>
            {/* <h5><u>Events</u></h5>

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
            } */}
          </div>
        )
      }
    }




export default Events;

// api key V5W6PxsWgHLxCZTb
