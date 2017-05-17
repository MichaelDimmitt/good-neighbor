import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import base from '../rebase';

window.base = base;


class Neighborhood extends Component {


  constructor () {
    super();
    this.state = {
      users: {},
      addresses: [],
      // owner: [],
      // text: []
    }
  }

componentDidMount() {
  base.fetch('users', {
    context: this,
    asArray: true
  }).then(response => this.setState({ users: response }))
}

compareLocations() {
  let address = this.state.users
  console.log(address);
  // address.map(user => console.log(user.addresses))
    // console.log(this.state.users);

}


//   componentDidMount() {
//     const projectId = this.props.match.params.id;
//       axios.get(`https://api.github.com/repositories/${projectId}`).then(response => this.setState({ project: response.data, owner: response.data.owner }));
// }


  // addText(){
  //   let message = document.getElementById('message').value;
  //   base.push(`users/comments`, {data: { text: {message}}})
  // }


  render() {
    // const user = this.state.users;
    // console.log(user)
    return (
      <div>
        {this.compareLocations()}
        test page
      </div>


      // <div>
      //   <div className="home">
      //     <a href="/"><button className="waves-effect waves-light btn">Home</button></a>
      //   </div>
      //     <div className="container">
      //       <h1 className="center blue-grey-text lighten-5"><strong>{project.name}</strong></h1>
      //       <p className="center"><strong>{project.description}</strong></p>
      //       <br />
      //       <div className="row details">
      //         <div className="col s6">
      //           <h4><u><strong>Owner Info</strong></u></h4>
      //           <h5><strong>Owner:</strong> {owner.login}</h5>
      //           <ul>
      //             <img className="responsive-img" src={owner.avatar_url}/>
      //             <br />
      //             <a href={owner.html_url} target="_blank">Link to Owner's Github</a>
      //           </ul>
      //         </div>
      //         <div className="col s6">
      //           <h4><u><strong>Misc Info</strong></u></h4>
      //           <ul>
      //             <h5><strong>Creation Date:</strong> {project.created_at}</h5>
      //             <h5><strong>Last Updated:</strong> {project.updated_at}</h5>
      //             <h5><strong>Language:</strong> {project.language}</h5>
      //             <h5><strong>Open Issues:</strong> {project.open_issues}</h5>
      //             <a href={project.homepage} target="_blank">Homepage</a>
      //           </ul>
      //         </div>
      //       </div>
      //
      //       <div className="comments">
      //         <h3><strong>Comments</strong></h3>
      //         <div className="messagesection">
      //           <ul id="list">
      //           </ul>
      //           <form className="" id="message-form col s6" action="#">
      //             <input type="text" placeholder="Message" id="message"/>
      //             <button className="waves-effect waves-light btn" id="message-button" type="submit" onClick={this.addText.bind(this)}>Submit</button>
      //           </form>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
    )}
}

export default Neighborhood;