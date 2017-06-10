var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require("react-redux");

var actions = require("actions");
import store from "configureStore";

import firebase from 'app/firebase/';
import router from 'app/router/router.jsx';
import {push} from 'react-router-redux';
import history from 'app/history/history.jsx';

console.log("history:", history);


firebase.auth().onAuthStateChanged((user)=>{
  if(user){
    history.push('/courses');
  }else{
    history.push('/');
  }
});




import 'bootstrap/dist/css/bootstrap.min.css';
// App css
require('applicationStyles');
require('courseStyle');


// localStorage.clear();

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
