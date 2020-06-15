import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addTertiaryAction } from "../TertiaryCategory/action";
import URLS from "../../../utils/urlConstant";

class addtertiaryTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      errormsgname : "",
      errormsgempty : '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }
  handleChange(e, key) {
    this.setState({ [key]: e.target.value });
  }

  async handleSaveButton(e) {
    e.preventDefault();
    // this.props.addcategorydata
    const { name, description } = this.state;

    let isNameCorrect = false;
  
    if(this.state.name == ''  && this.state.description == '')
    {
      this.setState({errormsgempty : "Please fill all the mandatory details"})
      isNameCorrect = false;
    }
    else {
      if(!isNaN(this.state.name)){
        this.setState({errormsgname : "Name not a number"})
        isNameCorrect = false;
      }

      else {
        this.setState({errormsgname : ""})
        isNameCorrect = true;
        if(isNameCorrect){
          await this.props.addTertiaryAction({
            name: name,
            description: description
          });

            if(this.props.status){
              this.props.history.push(URLS.TertiaryCategory);
            }  
           
        }
      }
     }
  }
 cancelEdit() {
    this.props.history.push(URLS.TertiaryCategory);
  }
  render() {
    return (
      <div className="edit-user-container">
        <h3 className="heading">End Use Tags</h3>
        <form>
        <span className= "ErrorMessageContainer">{this.state.errormsgempty}</span>  
          <div className="form-group">
            <label>Name* :</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              onChange={e => this.handleChange(e, "name")}
              value={this.state.name}
            ></input>
             <span className= "ErrorMessageContainer">{this.state.errormsgname}</span>
          </div>
          <div className="form-group">
            <label>Description* :</label>
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Description"
              onChange={e => this.handleChange(e, "description")}
              value={this.state.description}
            ></input>
          </div>
         
          <br />
          <div className="bottom-button-padding">
            <button
              className="btn btn-primary customButton"
              onClick={this.handleSaveButton}
            >
              Save
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-primary customButton"
              onClick={this.cancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ tertiaryCategoryReducer }) => ({
  status: tertiaryCategoryReducer.status,
  message: tertiaryCategoryReducer.message
});

const mapDispatchToProps = dispatch => ({
    addTertiaryAction: bindActionCreators(addTertiaryAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addtertiaryTag);
