import firebase from "firebase";


// Initialize Firebase

try{
  var config = {
    apiKey: "AIzaSyA-mOVXlhFGBsqlP7Y0jv1reavNUvESW5E",
    authDomain: "e-learning-e7f0b.firebaseapp.com",
    databaseURL: "https://e-learning-e7f0b.firebaseio.com",
    projectId: "e-learning-e7f0b",
    storageBucket: "e-learning-e7f0b.appspot.com",
    messagingSenderId: "1008810066767"
  };
  firebase.initializeApp(config);
}catch(e){

}



export var githubProvider = new firebase.auth.GithubAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;
