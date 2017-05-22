import React, { Component } from 'react';


class Events extends Component {


  render () {
      const user = this.props.user
      return (
        <div className='large-profile'>
          <h5>Events</h5>
            <img
              width='70'
              className='avatar repsonsive-img profile-pic'
              src={user.photoURL}/>
              <br />
              {user.displayName}
        </div>
      )
    }
  }




export default Events;
