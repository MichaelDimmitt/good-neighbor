import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import App from './components/App';
import './index.css';

  firebase.initializeApp({
    apiKey: "AIzaSyBWLjW3g5xV99YFcxpzrJE4wIb_XNPNgUI",
    authDomain: "good-neighbor-8bcdd.firebaseapp.com",
    databaseURL: "https://good-neighbor-8bcdd.firebaseio.com",
    projectId: "good-neighbor-8bcdd",
    storageBucket: "good-neighbor-8bcdd.appspot.com",
    messagingSenderId: "687646170705"
  })


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
