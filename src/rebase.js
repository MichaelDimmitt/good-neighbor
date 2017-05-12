var Rebase = require('re-base');

var config = {
    apiKey: "AIzaSyBWLjW3g5xV99YFcxpzrJE4wIb_XNPNgUI",
    authDomain: "good-neighbor-8bcdd.firebaseapp.com",
    databaseURL: "https://good-neighbor-8bcdd.firebaseio.com",
    projectId: "good-neighbor-8bcdd",
    storageBucket: "good-neighbor-8bcdd.appspot.com",
    messagingSenderId: "687646170705"
  };

  var base = Rebase.createClass(config);

  export default base;
