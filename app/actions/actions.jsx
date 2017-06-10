import firebase,{firebaseRef,githubProvider} from 'app/firebase/';
import moment from "moment";
var uuid = require("node-uuid");
import inventory from "./inventory.js";



export var addCourse = (course)=>{
  return {
    type: "ADD_COURSE",
    course
  };
};

export var addCourses = (courses)=>{
  return {
    type: "ADD_COURSES",
    courses
  };
};

export var initialize = (email)=>{
  return (dispatch,getState)=>{
    var courseRef = firebaseRef.child("courses");
    inventory.forEach((course)=>{
      courseRef.push({
        ...course,
        email,
        id: uuid()
      });
    });
  };
};


// after fetch emails from firebase, push them into store
export var addEmails = (emails)=>{
  return {
    type:"ADD_EMAILS",
    emails
  };
};


export var startInitialize= (email)=>{
  return (dispatch,getState)=>{
    var emailsRef = firebaseRef.child("emails");

    return emailsRef.once("value").then((snapshot)=>{
      var emails = snapshot.val()||{};
      var parsedEmails = [];

      Object.keys(emails).forEach((c)=>{
        parsedEmails.push(c);
      });
      // new email log in
      if(!emails[email]){
        // for this email, initialize default courses from inventory.json
        dispatch(initialize(email));
        // Add this email to firebase
        emails[email] = true;
        emailsRef.set(emails);
        parsedEmails.push(email);
      }
      // add fetched email set to store
      dispatch(addEmails(parsedEmails));
    });
  }
}

// fetch All courses from firebase
export var startAddCourses = ()=>{
  return (dispatch,getState) =>{
    var coursesRef = firebaseRef.child("courses");

    return coursesRef.once("value").then((snapshot)=>{
      var courses = snapshot.val() || {};
      var parsedCourses = [];

      Object.keys(courses).forEach((courseId)=>{
        parsedCourses.push({
          ...courses[courseId]
        });
      });

      // add courses into store
      dispatch(addCourses(parsedCourses));

    });
  };
};


//async action to add course for both store and firebase
export var startAddCourse = (title,description,count,img,email) =>{
  return (dispatch,getState)=>{
    var course = {
      title,
      description,
      lessons_count:count,
      email,
      graphic:{
        alt:title,
        src:img
      },
      id:uuid()
    };
    var courseRef = firebaseRef.child("courses").push(course);

    return courseRef.then(()=>{
      dispatch(addCourse(course));
    });
  }
};


export var startLogin = ()=>{
  return (dispatch,getState)=>{
    return firebase.auth().signInWithPopup(githubProvider).then((result)=>{
      console.log('Auth worked',result);
    },(error)=>{
      console.log("Unable to auth",error);
    });
  };
};

export var clearCourses = ()=>{
  return {
    type:"CLEAR_COURSES"
  };
};

export var startLogout = ()=>{
  return (dispatch,getState)=>{
    return firebase.auth().signOut().then(()=>{
      console.log("Logged out!");
      dispatch(clearCourses());
    });
  };
};
