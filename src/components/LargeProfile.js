import React, { Component } from 'react';


class LargeProfile extends Component {


  render () {
      const user = this.props.user
      return (
        <div className='large-profile'>
            <img
              width='70'
              className='avatar repsonsive-img profile-pic materialboxed'
              src={user.photoURL}/>
              <br />
              {user.displayName}
        </div>
      )
    }
  }




export default LargeProfile;
