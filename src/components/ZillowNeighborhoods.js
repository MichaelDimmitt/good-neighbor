import React, { Component } from 'react';
import ChatBox from './ChatBox'
import LargeProfile from './LargeProfile';
import Weather from './Weather';
import Board from './Board';
import Footer from './Footer';
import Events from './Events';
import Header from './Header'
import base from '../rebase';
var $ = window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min')
import materialize from 'materialize-css';

window.base = base;

class ZillowNeighborhoods extends Component {


  constructor () {
    super();
    this.state = {
      users: {},
      currentUser: {},
      filteredUsers: [],
      text: [],
      neighborhood: [],

      chatDisplay: {
        display: true,
        selectedUser: {}
      }
    }
  }



  componentDidMount(){
    base.fetch(`neighborhoods/${this.props.match.params.id}`, {
      context: this,
      asArray: false })
      .then(response => this.setState({ neighborhood: response }))

    base.onAuth(this.setUserState.bind(this));

    $('.modal').modal();

  }

  setUserState (currentUser) {
    this.setState({
      currentUser: currentUser || {}
    });
  }

  convertUsersToArr(users){
    let arr = Object.keys(users)
    return arr.map((iteration, i) => {
      return users[iteration]
    })
  }

  displayNeighbors(){
    if (this.state.neighborhood.id && this.state.currentUser) {
      let usersArr = this.convertUsersToArr(this.state.neighborhood.users);
    const currentUser = this.state.currentUser
    return(
      <div>
        <br />
        <h5 className='center-align hood-title'>Your Neighbors:</h5>
        <ul className='user-scroll'>
          {usersArr.map((user) => {
            if(currentUser.displayName === user.name) {
              return null

            } else {
              return  (
                <div className='users-in-hood'>
                  <div className='center-align'>
                  {user.name}
                  </div>
                  <br />
                  <li className=''>
                    <div className='col s12 center-align'>
                    <img
                    width='105'
                    className='avatar repsonsive-img z-depth-4 neighbors-pic'
                    alt='neighbor avatar pic'
                    src={user.pic} />
                  </div>
                  <div className='row'>
                    <div className='col s6 m12 center-align'>
                      <a href={`mailto:${user.email}`}><button className="waves-effect waves-light btn email-button">Email</button></a>
                    </div>
                    <div className='col s6 m12 center-align'>
                       <button data-target="modal1" className="waves-effect waves-light btn chat-button" onClick={this.buttonClick.bind(this, user)}>Chat</button>
                    </div>
                  </div>
                  </li>
                </div>
              )
            }
          })}
        </ul>
      </div>
    )
  }
  }

  buttonClick (user){
    this.setState({ chatDisplay: {display: this.state.chatDisplay.display, selectedUser: user}})
  }


  showChatBox(){
    if (this.state.chatDisplay.display && this.state.chatDisplay.selectedUser.uid) {
      return (
        <ChatBox
          user={this.state.chatDisplay.selectedUser}
          currentUser={this.state.currentUser}
          userKey={this.state.chatDisplay.selectedUser.uid}
          id={this.props.match.params.id}
        />
      )
    } else {
    return null
    }
  }


  render() {
    return (
      <div className='col s12'>
        <Header
          user={this.state.currentUser}
        />
        <br />
        <br />
        <div className='neighborhood-indicator z-depth-3 col s12'>{this.state.neighborhood.name}, {this.state.neighborhood.city}</div>
        <div className='row'>
          <div className='col s12 m2'>
            <LargeProfile
              user={this.state.currentUser}
            />
            {this.displayNeighbors()}
          </div>

          <div className='col s12 m7'>
            <Board
              neighborhood={this.state.neighborhood}
              id={this.props.match.params.id}
              currentUser={this.state.currentUser}
            />
          </div>
          <div className='col s12 m3'>
            <Events
              location={this.props.address}
            />
            {/* <Weather
              location={this.props.address}
            /> */}
          </div>
          <div id="modal1" className="modal">
            {this.showChatBox()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default ZillowNeighborhoods;
