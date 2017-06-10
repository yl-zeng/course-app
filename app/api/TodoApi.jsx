
var $ = require("jquery");


module.exports={

  filterCourses: function(courses,email){
    var filterCourses = courses;
    filterCourses = filterCourses.filter((course)=>{
      return course.email===email;
    });

    return filterCourses;
  },

};
