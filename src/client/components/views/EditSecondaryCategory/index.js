import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateCategory } from "../SecondaryCategory/action";
import URLS from "../../../utils/urlConstant";

class EditSecondaryCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      errormessage : "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateCategoryManage = this.updateCategoryManage.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  UNSAFE_componentWillMount() {
    const tag = this.props.category.find(
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
    await this.props.putcategoryAction({
      name,
      description,
      id: this.props.match.params.id
    });
    const {status} = this.props;
    if(status) 
    {
     this.props.history.push(URLS.SecondaryCategory);
    } 
    else {
      this.setState({errormessage: "Fields should not be empty"});
    }
  }
  cancelEdit() {
    this.props.history.push(URLS.SecondaryCategory);
  }

  render() {
    return (
      <div className="edit-user-container">
        <h3 className="heading">Secondary Category</h3>
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
        <span className= "ErrorMessageContainer">{this.state.errormessage}</span>
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

const mapStateToProps = ({ SecondaryCategoryReducer }) => ({
  category: SecondaryCategoryReducer.category,
  status: SecondaryCategoryReducer.status,
  message: SecondaryCategoryReducer.message
});

const mapDispatchToProps = dispatch => ({
  putcategoryAction: bindActionCreators(updateCategory, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSecondaryCategory);
