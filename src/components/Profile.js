import React, { Component } from 'react';


class Profile extends Component {


  render () {
      const user = this.props.user
      return (
        <div className='center-align home-profile'>
          <img
            width='90'
            className='avatar repsonsive-img profile-pic'
            alt='users profile pic'
            src={user.photoURL}/>
            <br />
            {user.displayName}
        </div>
      )
    }
  }




export default Profile;
