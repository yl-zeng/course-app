var React = require("react");
import Course from "Course";
var {connect} = require("react-redux");
var TodoApi = require("TodoApi");
var actions = require("actions");
import firebase from "firebase";
import store from "configureStore";
import ReactPaginate from 'react-paginate';

export class CourseList extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0,
      limit: 6,
      detailId: undefined
    };

    store.subscribe(() => {
      var email = firebase.auth().currentUser.email.replace(".","+");
      var data = TodoApi.filterCourses(store.getState().courses,email);
      var limit = this.state.limit;
      console.log("get Update courses!:",data);
      this.setState({
        data,
        pageCount:  Math.ceil(data.length / limit)
      });
    });
  }

  handleDetail = (id)=>{
    if(id === this.state.detailId){
      this.setState({
        detailId:undefined
      });
    }else{
      this.setState({
        detailId:id
      });
      $(window).scrollTop(0);
    }
  }


  handlePageClick = (data)=>{
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.limit);
    this.setState({
      offset
    });
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    var limit = parseInt(this.refs.limit.value);
    var pageCount = Math.ceil(this.state.data.length / limit);
    // prevent non-integer input
    if(Number.isInteger(limit)){
      this.setState({
        limit,
        pageCount
      });
    }
    this.refs.limit.value="";
  }

  render(){

    var renderDetail = ()=>{
      if(!this.state.detailId){
        return <div></div>;
      }
      return this.state.data.map((course)=>{
        if(course.id===this.state.detailId){
          return (
            <div className="row">
              <div>
                <Course onDetail={this.handleDetail} key={course.id} {...course} />
              </div>
              <div className="col-sm-8">
                <h3>Description</h3>
                <p>{course.description}</p>
                <h3>Lesson Count</h3>
                <p>{course.lessons_count}</p>
                <hr></hr>
              </div>
            </div>
          );
        }
      });
    }

    var renderCourses = ()=>{
      var {offset,limit} = this.state;

      return this.state.data.slice(offset,offset + limit).map((course)=>{
        return (
          <Course onDetail={this.handleDetail} key={course.id} {...course} />
        );
      });
    };

    return(
      <div>
        <div className="row">
          {renderDetail()}
          {renderCourses()}
        </div>
        <div className="row text-center">
          <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
        </div>
        <div className="window__footer">
          <form onSubmit={this.handleSubmit}>
            <input type="text" ref="limit" className="form-control" placeholder="How many courses per page"/>
            <button type="submit" className="btn btn-primary btn-block" style={{marginTop:"16px"}}>Change Courses per page</button>
          </form>
        </div>
      </div>
    )
  }
};


export default connect(
  (state)=>{
    return state;
  }
)(CourseList);
