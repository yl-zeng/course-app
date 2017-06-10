var React = require("react");
var {connect} = require("react-redux");
var actions = require("actions");
import firebase from "app/firebase";

export class AddCourse extends React.Component{
  handleSubmit = (e)=>{
    e.preventDefault();
    var title = this.refs.title.value;
    var description = this.refs.description.value;
    var count = parseInt(this.refs.count.value);
    var img = this.refs.img.value;
    var email = firebase.auth().currentUser.email.replace(".","+");
    var {dispatch} = this.props;
    if(title.length > 0 && description.length>0 && img.length>0 && Number.isInteger(count)){
      this.refs.title.value="";
      this.refs.description.value = "";
      this.refs.count.value = "";
      this.refs.img.value = "";
      dispatch(actions.startAddCourse(title,description,count,img,email));
    }else{
      this.refs.title.focus();
    }
  }

  render(){
    return (
      <div className="window__footer">
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="title" className="form-control" placeholder="Title"/>
          <input type="text" ref="description" className="form-control" placeholder="Description"/>
          <input type="text" ref="img" className="form-control" placeholder="Image"/>
          <input type="text" ref="count" className="form-control" placeholder="Lesssons Count"/>
          <button type="submit" className="btn btn-primary btn-block" style={{marginTop:"16px"}}>Add Course</button>
        </form>

      </div>
    );
  }
};


export default connect()(AddCourse);
