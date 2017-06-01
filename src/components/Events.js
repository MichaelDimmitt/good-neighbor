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
    axios.get(`https://tiy-orl-proxy.herokuapp.com/eventful?app_key=V5W6PxsWgHLxCZTb&where=${location[1]},${location[2]}&within=25&date=Next%20Week&sort_order=popularity`)
    .then(response => this.setState({ localEvents: response.data.events.event }))
  }


    render () {
      return (
        <div className='large-profile'>
          <h5><u>Upcoming Events Near You</u></h5>
          <br />
          {this.state.localEvents[0] &&
          <div>Event: <a href={this.state.localEvents[0].url} target="_blank">{this.state.localEvents[0].title}</a>
            <br />
            Date: {this.state.localEvents[0].start_time}
          </div>}
          <br />
          {this.state.localEvents[1] &&
          <div>Event: <a href={this.state.localEvents[1].url} target="_blank">{this.state.localEvents[1].title}</a>
            <br />
            Date: {this.state.localEvents[1].start_time}
          </div>}
          <br />
          {this.state.localEvents[2] &&
          <div>Event: <a href={this.state.localEvents[2].url} target="_blank">{this.state.localEvents[2].title}</a>
            <br />
            Date: {this.state.localEvents[2].start_time}
          </div>}
          <br />
          {this.state.localEvents[3] &&
          <div>Event: <a href={this.state.localEvents[3].url} target="_blank">{this.state.localEvents[3].title}</a>
            <br />
            Date: {this.state.localEvents[3].start_time}
          </div>}
          <br />
          {this.state.localEvents[4] &&
          <div>Event: <a href={this.state.localEvents[4].url} target="_blank">{this.state.localEvents[4].title}</a>
            <br />
            Date: {this.state.localEvents[4].start_time}
          </div>}
        </div>
      )
    }
  }




export default Events;
