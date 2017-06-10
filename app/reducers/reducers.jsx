
var uuid = require("node-uuid");
var moment = require("moment");


// Email Reducer
export var emailReducer = (state = {},action)=>{
  switch(action.type){
    case "ADD_EMAILS":
      action.emails.forEach((email)=>{
        state[email] = true;
      });
      return state;
    default:
      return state;
  }
};

// Course Reducer
export var coursesReducer = (state = [],action)=>{
  switch(action.type){
    case "ADD_COURSES":
      return [
        ...state,
        ...action.courses
      ];
    case "ADD_COURSE":
      return [
        ...state,
        action.course
      ];
    case "CLEAR_COURSES":
      console.log("course cleared");
      return [];
    default:
      return state;


  }
};
