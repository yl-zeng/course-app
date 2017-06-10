import React from 'react';
import {
  Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import CourseApp from 'CourseApp';
import Login from 'Login';
import firebase from 'app/firebase/';
import store from "configureStore";
import history from "app/history/history.jsx";
import {push} from 'react-router-redux';

var requireLogin = (nextState,replace,next)=>{
  if(!firebase.auth().currentUser){
    console.log("kick out");
    store.dispatch(push('/'));
  }
  next();
};

var redirectIfLoggedIn = (nextState,replace,next)=>{
  var user = firebase.auth().currentUser;
  if(user){
    store.dispatch(push('/courses'));
  }

  next();
};


export default (
  <Router history={history}>
    <div>
      <Route exact path="/" component={Login} onEnter={redirectIfLoggedIn}/>
      <Route path="/courses" component={CourseApp} onEnter={requireLogin}/>
    </div>
  </Router>
);
