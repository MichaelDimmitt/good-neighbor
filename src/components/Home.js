import React, { Component } from 'react';
import axios from 'axios';
import ProjectSearchResult from './projectSearchResult';
import Favorites from './Favorites';
import base from '../rebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

window.base = base;

class Home extends Component {

  constructor () {
    super();
    this.state = {
      user: {},
      searchResults: {},
      users: [],
      projects: []
    }
  }


  componentDidMount () {
    base.onAuth(this.setUserState.bind(this));
  }


  setUserState (user) {
    this.setState({
      user: user || {}
    });
    if (user) {
      base.syncState(`users/${user.uid}/projects`, {
        context: this,
        asArray: true,
        state: 'projects'
      });
      // base.syncState(`users/${user.uid}/users`, {
      //   context: this,
      //   asArray: true,
      //   state: 'users'
      // });
    }
  }

  // componentWillUnmount () {
  //   base.removeBinding(this.offSwitchForUsers);
  //   base.removeBinding(this.offSwitchForProjects);
  // }

  login () {
    base.authWithOAuthPopup('google', function (){});
  }

  logout () {
    base.unauth()
  }

  loginOrLogoutButton () {
    if (this.state.user.uid) {
      return <button className="waves-effect waves-light btn" onClick={this.logout.bind(this)}>Logout</button>
    } else {
      return <button className="waves-effect waves-light btn" onClick={this.login.bind(this)}>Login</button>
    }
  }


  formIfLoggedIn () {
    if (this.state.user.uid) {
      return (
        <form onSubmit={this.searchGoogleMaps.bind(this)}>
          <input
            placeholder='Address'
            ref={element => this.addressName = element} />
          <button className="waves-effect waves-light btn">Searh for your Neighbors</button>
        </form>
      )
    }
  }


  searchGoogleMaps (event) {
    event.preventDefault();
    const address = this.addressName.value;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCmStoy8C78sZ6lX2BvPYK3UuwYfx_CvhE`)
    // .then(response => console.log(response.data.results[0].geometry.location))
    .then(response => this.setState({ searchResults: response.data.results[0].geometry.location }));
    this.addressName.value = '';
  }


  displaySearchResults () {
    if (this.state.searchResults.items) {
      const results = this.state.searchResults;
      const projectIds = this.state.projects.map(p => p.id);
      return (
        <div>
          <h6>{results.total_count} Results</h6>
          <ul>
            {results.items.map((project, index) => {
              return <ProjectSearchResult key={index} project={project}
              alreadyInFirebase={projectIds.includes(project.id)}
              addProject={this.addProject.bind(this)}
              removeProject={this.removeProject.bind(this)} />
            }
            )}
          </ul>
        </div>
      )
    }
  }






  // searchGithubProjects (event) {
  //   event.preventDefault();
  //   const project = this.projectName.value;
  //   axios.get(`https://api.github.com/search/repositories?q=${project}`)
  //    .then(response => this.setState({ searchResults: response.data }));
  //   this.projectName.value = '';
  // }
  //
  //
  // formIfLoggedIn () {
  //   if (this.state.user.uid) {
  //     return (
  //       <form onSubmit={this.searchGithubProjects.bind(this)}>
  //         <input
  //           placeholder='Favorite GitHub Projects'
  //           ref={element => this.projectName = element} />
  //         <button className="waves-effect waves-light btn">Search GitHub Repos</button>
  //       </form>
  //     )
  //   }
  // }

  // displaySearchResults () {
  //   if (this.state.searchResults.items) {
  //     const results = this.state.searchResults;
  //     const projectIds = this.state.projects.map(p => p.id);
  //     return (
  //       <div>
  //         <h6>{results.total_count} Results</h6>
  //         <ul>
  //           {results.items.map((project, index) => {
  //             return <ProjectSearchResult key={index} project={project}
  //             alreadyInFirebase={projectIds.includes(project.id)}
  //             addProject={this.addProject.bind(this)}
  //             removeProject={this.removeProject.bind(this)} />
  //           }
  //           )}
  //         </ul>
  //       </div>
  //     )
  //   }
  // }


  displayNeighborhoods() {
    if(this.state.projects) {
      const results = this.state.projects
      const projectId = this.state.projects.map(p => p.id);
      // console.log(projectId);
      return (
        <div>
          <h5><strong>Neighborhoods</strong></h5>
          <ul>
            {results.map((project, index) => {
              return <Favorites key={index} project={project} />
            }
            )}
          </ul>
        </div>
      )
    }
  }


  addAddress(project){
    let list = document.querySelector('.Favorites');
    let projectList = this.state.projects

    const projectData = {name: project.name, id: project.id}
      this.setState({
        projects: this.state.projects.concat(projectData)
      })
}



  removeAddress(project){
    const projectId = project.id
    let projectData = this.state.projects

    this.setState ({
      projects: projectData.filter(object => object.id !== projectId)
    })
  }


  render() {
    return (
        <div>
          <div className="log">
            {this.loginOrLogoutButton()}
          </div>
          <div className="row">
            <div className="col s2 favorites">
              {this.displayNeighborhoods()}
            </div>
            <div className="col s10">
              {this.formIfLoggedIn()}
              {this.displaySearchResults()}
            </div>
          </div>
        </div>
    );
  }
}

export default Home;
