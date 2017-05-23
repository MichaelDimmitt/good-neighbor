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
      axios.get(`https://tiy-orl-proxy.herokuapp.com/eventful?app_key=V5W6PxsWgHLxCZTb&where=${location.lat},${location.lng}&within=25&date=Next%20Week&sort_order=popularity`)
      .then(response => this.setState({ localEvents: response.data.events.event }))
  }


    render () {
        return (
          <div className='large-profile'>
            <h5><u>Upcoming Events Near You</u></h5>
            <br />
            {this.state.localEvents[0] &&
            <div>1. <a href={this.state.localEvents[0].url} target="_blank">{this.state.localEvents[0].title}: {this.state.localEvents[0].start_time}</a></div>
            }
            <br />
            {this.state.localEvents[1] &&
            <div>2. <a href={this.state.localEvents[1].url} target="_blank">{this.state.localEvents[1].title}: {this.state.localEvents[1].start_time}</a></div>
            }
            <br />
            {this.state.localEvents[2] &&
            <div>3. <a href={this.state.localEvents[2].url} target="_blank">{this.state.localEvents[2].title}: {this.state.localEvents[2].start_time}</a></div>
            }
            <br />
            {this.state.localEvents[3] &&
            <div>4. <a href={this.state.localEvents[3].url} target="_blank">{this.state.localEvents[3].title}: {this.state.localEvents[3].start_time}</a></div>
            }

              {/* <div><u>Temperature:</u> {this.state.currentWeather.temp_f}&deg;F</div>
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
