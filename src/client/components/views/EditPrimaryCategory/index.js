import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Select from "react-select";
import { getCategory } from "../SecondaryCategory/action";
import { updateTag } from "../PrimaryCategory/action";

import URLS from "../../../utils/urlConstant";
import {
  createCategoryOption,
  renameKeysInArrOfObj
} from "../../../utils/common";

class EditPrimaryCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      selectedOption: "",
      optionsData: [],
      errormsgname: "",
      errormsgempty : '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateTagManage = this.updateTagManage.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  UNSAFE_componentWillMount() {
    const tag = this.props.tags.find(
      item => item._id === this.props.match.params.id
    );
    const { name = "", description = "" } = tag || {};
    const selectedOption = tag ? createCategoryOption(tag.categoryList) : [];
    this.setState({
      name,
      description,
      selectedOption,
    });
  }
  handleChangeSelect(value) {
    this.setState({ selectedOption: value });
  }
  componentDidMount() {
    this.props.getCategoryAction();
  }
  handleChange(e, key) {
    this.setState({ [key]: e.target.value });
  }

  async updateTagManage() {
    const { name, description, selectedOption } = this.state;
    let isNameCorrect = false;
    const secondaryList = renameKeysInArrOfObj(
      this.state.selectedOption,
      "value",
      "key",
      "label",
      "name"
    );
  
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
          await this.props.putcategoryAction({
                name,
                description,
                id: this.props.match.params.id,
                secondaryList ,
              });

            if(this.props.status){
              this.props.history.push(URLS.PrimaryCategory);
            }  
           
        }
      }
     }
  }
  cancelEdit() {
    this.props.history.push(URLS.PrimaryCategory);
  }
  render() {
    const { tags } = this.props;
    const{options} = this.state.optionsData;
    return (
      <div className="edit-user-container">
        <h3 className="heading">Primary Category</h3>
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
        <label>Select Secondary Category:</label>
        <Select
          value={this.state.selectedOption}
          onChange={value => this.handleChangeSelect(value)}
          options={tags ? createCategoryOption(tags) : []}
          isMulti={true}
        />
       
        <br />
        <div className="bottom-button-padding">
          <button
            className="btn btn-primary customButton"
            onClick={this.updateTagManage}
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

const mapStateToProps = ({
  PrimaryCategoryReducer,
}) => ({
  tags: PrimaryCategoryReducer.tags,
  status: PrimaryCategoryReducer.status,
  message: PrimaryCategoryReducer.message,
});

const mapDispatchToProps = dispatch => ({
  putcategoryAction: bindActionCreators(updateTag, dispatch),
  getCategoryAction: bindActionCreators(getCategory, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPrimaryCategory);

