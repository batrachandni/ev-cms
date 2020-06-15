import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addCategoryAction } from "../SecondaryCategory/action";
import URLS from "../../../utils/urlConstant";

class AddSecondaryCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      errormessage : "",
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

    await this.props.addcategoryAction({
      name: name,
      description: description
    });
    this.setState({errormessage:""});
    if (this.props.status) {
      this.props.history.push(URLS.SecondaryCategory);
    } else {
      this.setState({errormessage:"Fields should not be empty"});
    }
  }
  cancelEdit() {
    this.props.history.push(URLS.SecondaryCategory);
  }
  render() {
    return (
      <div className="edit-user-container">
        <h3 className="heading">Secondary Category</h3>
        <form>
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

const mapStateToProps = ({ SecondaryCategoryReducer }) => ({
  status: SecondaryCategoryReducer.status,
  message: SecondaryCategoryReducer.message
});
const mapDispatchToProps = dispatch => ({
  addcategoryAction: bindActionCreators(addCategoryAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSecondaryCategory);
