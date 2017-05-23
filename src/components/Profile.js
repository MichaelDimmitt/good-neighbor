import React, { Component } from 'react';


class Profile extends Component {


  render () {
      const user = this.props.user
      return (
        <div>
            <img
              width='32'
              className='avatar repsonsive-img profile-pic'
              src={user.photoURL}/> {user.displayName}
        </div>
      )
    }
  }




export default Profile;
