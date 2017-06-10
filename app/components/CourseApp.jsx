var React = require("react");
import * as Redux from 'react-redux';

import CourseList from 'CourseList';
import AddCourse from "AddCourse";

import * as actions from 'actions';
import firebase from 'app/firebase/';
import store from "configureStore";

export class CourseApp extends React.Component{

  constructor(props) {
    super(props);
    var {dispatch} = this.props;
    var email = firebase.auth().currentUser.email.replace(".","+");
    dispatch(actions.startInitialize(email));
  }

  componentWillMount(){
    var {dispatch} = this.props;
    dispatch(actions.startAddCourses());
  }


  onLogout = (e)=>{
    var {dispatch} = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  }

  render(){


    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2 col-sm-offset-10 dashboard">
            <h5>{`${firebase.auth().currentUser.email}`}</h5>
            <a href="#" onClick={this.onLogout}><button className="btn btn-primary btn-block">Logout</button></a>
          </div>
        </div>
        <h1 className="page-title text-center">Course App</h1>
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 main-window">
            <CourseList/>
            <AddCourse/>
          </div>
        </div>
      </div>
    );
  }
};

export default Redux.connect(
  (state)=>{
    return state;
  }
)(CourseApp);
