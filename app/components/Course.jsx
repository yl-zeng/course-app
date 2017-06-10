var React = require("react");
var moment = require("moment");

var {connect} = require("react-redux");
var actions = require("actions");


//Single Course Component
export class Course extends React.Component{

  handleClick = (e)=>{
    e.preventDefault();
    var {id,title,graphic,dispatch} = this.props;
    this.props.onDetail(id);
  }

  render(){
    var {id,title,graphic,dispatch} = this.props;

    return(
      <div className="col-sm-4">
        <div>
          <figure className="course" onClick={this.handleClick}>
            <img className="img-responsive" src={graphic.src} placeholder={graphic.alt}></img>
            <figcaption className="course-title">{title}</figcaption>
          </figure>
        </div>
      </div>
    )
  }
};

export default connect()(Course);
