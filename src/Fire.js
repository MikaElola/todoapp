import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyBU5PTfyP2Tydzk1XiDuDcdGB9iICKTkXo",
    authDomain: "todoapp-96189.firebaseapp.com",
    databaseURL: "https://todoapp-96189.firebaseio.com",
    projectId: "todoapp-96189",
    storageBucket: "todoapp-96189.appspot.com",
    messagingSenderId: "954717346150"
  };
 var fire = firebase.initializeApp(config);

  export default fire;