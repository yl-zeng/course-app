import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';


export class Login extends React.Component{

  onLogin = ()=>{
    var {dispatch} = this.props;
    dispatch(actions.startLogin());
  }

  render(){
    return (
      <div className="container">
        <h1 className="page-title text-center">Course App</h1>
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 main-window login-window">
            <div className="text-center">
              <h1>Login</h1>
              <h3>React v15 + Redux + React-Router v4 + Firebase + Node.js</h3>
            </div>
            <ul style={{position:"absolute",left:"30%"}}>
              <li>OAuth Authentication</li>
              <li>Pagination Courses</li>
              <li>Detail view</li>
              <li>Course Manipulate</li>
            </ul>
            <div className="text-center" style={{marginTop:"120px"}}>
              <button className="btn btn-primary" onClick={this.onLogin}>Login with Github</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};


export default Redux.connect()(Login);
