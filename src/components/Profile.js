import React, { Component } from 'react';


class Profile extends Component {


  render () {
      const user = this.props.user
      return (
        <div classname='profile left z-depth-4'>
            <img
              width='67'
              className='avatar repsonsive-img profile-pic'
              src={user.photoURL}/>
              <br />
              {user.displayName}
        </div>
      )
    }
  }




export default Profile;
