import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateTertiaryTag } from "../TertiaryCategory/action";
import URLS from "../../../utils/urlConstant";

class editTertiaryTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      errormsgname : "",
      errormsgempty : '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateCategoryManage = this.updateCategoryManage.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  UNSAFE_componentWillMount() {
    const tag = this.props.tertiaryList.find(
      item => item._id === this.props.match.params.id
    );
    const { name = "", description = "" } = tag || {};
    this.setState({
      name,
      description
    });
  }
  handleChange(e, key) {
    this.setState({ [key]: e.target.value });
  }
  async updateCategoryManage() {
    const name = this.state.name;
    const description = this.state.description;
    await this.props.updateTertiaryTag({
      name,
      description,
      id: this.props.match.params.id
    });
    let isNameCorrect = false;

    if(this.state.name == ''  && this.state.description == '')
    {
    
      this.setState({errormsgempty : "Please fill all the mandatory details"})
      isNameCorrect = false;
    }
    else {

      if(!isNaN(this.state.name)){
        this.setState({errormsgname : "Name not a number"})
        isNameCorrect = false
      }

      else {
        this.setState({errormsgname : ""})
        isNameCorrect = true;
    
        if(isNameCorrect){
          await this.props.updateTertiaryTag({
            name,
            description,
            id: this.props.match.params.id
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
       <span className= "ErrorMessageContainer">{this.state.errormsgempty}</span> 
        <div className="form-group">
          <label>Name:</label>
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
          <label>Description:</label>
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
            onClick={this.updateCategoryManage}
          >
            Update
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-primary customButton"
            onClick={this.cancelEdit}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tertiaryCategoryReducer }) => ({
  tertiaryList: tertiaryCategoryReducer.tertiaryList,
  status: tertiaryCategoryReducer.status,
  message: tertiaryCategoryReducer.message
});

const mapDispatchToProps = dispatch => ({
    updateTertiaryTag: bindActionCreators(updateTertiaryTag, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editTertiaryTag);


