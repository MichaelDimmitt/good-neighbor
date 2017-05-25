import React, { Component } from 'react';


class LargeProfile extends Component {


  render () {
      const user = this.props.user
      return (
        <div className='large-profile center-align'>
            <img
              width='120'
              className='avatar repsonsive-img profile-pic z-depth-3 center-align'
              src={user.photoURL}/>
              <br />
              {user.displayName}
        </div>
      )
    }
  }




export default LargeProfile;
