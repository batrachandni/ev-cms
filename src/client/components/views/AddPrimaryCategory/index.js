import React, { Component } from "react";
import Select from "react-select";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addCategoryAction , getPrimaryTag } from "../PrimaryCategory/action";
import URLS from "../../../utils/urlConstant";
import { createCategoryOption } from "../../../utils/common";

class AddPrimaryCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      errormsgname:"",
      selectedOption: [],
      optionsdata: [],
      errormsgempty : '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }
  handleChange(e, key) {
    this.setState({ [key]: e.target.value });
  }

  handleChangeSelect(value) {
    this.setState({ selectedOption: value });
  }

  async componentDidMount() {
    await this.props.getPrimaryTag();
    const categoryListData = this.props.tags;
    if (categoryListData.length) {
      const data = createCategoryOption(categoryListData);
      this.setState({ optionsdata: data });
    }
  }

  handleSaveButton = async () => {
     const { name, description , selectedOption} = this.state;
     let isNameCorrect = false;
     const optionsdataa = selectedOption.reduce((arr, newdata) => {
      return arr.concat({
        name: newdata.label,
        key: newdata.value,
        _id: newdata._id
      });
    }, []);
  

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
            await this.props.addCategoryAction({
                      name: name,
                      description: description,
                      secondaryList : optionsdataa,
                 });
  
              if(this.props.status){
                this.props.history.push(URLS.PrimaryCategory);
              }  
             
          }
        }
       }

 };

  cancelEdit() {
    this.props.history.push(URLS.PrimaryCategory);
  }
  render() {
    const options = this.state.optionsdata;
    const { selectedOption } = this.state;
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
            value={this.state.name}
            onChange={e => this.handleChange(e, "name")}
          ></input>
           <span className= "ErrorMessageContainer">{this.state.errormsgname}</span>
           </div>
        <div className="form-group">
          <label>Description* :</label>
          <input
            type = "text"
            name="description"
            className="form-control"
            placeholder="Description"
            value={this.state.description}
            onChange={e => this.handleChange(e, "description")}
          ></input>
        </div>
        
        <br />
        <label>Select Tag:</label>
        <Select
          value={selectedOption}
          onChange={this.handleChangeSelect}
          options={options}
          isMulti={true}
        />
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
      </div>
    );
  }
}


const mapStateToProps = ({PrimaryCategoryReducer}) => ({
  status: PrimaryCategoryReducer.status,
   message: PrimaryCategoryReducer.message,
   tags : PrimaryCategoryReducer.tags,
   
 });
const mapDispatchToProps = dispatch => ({
  addCategoryAction: bindActionCreators(addCategoryAction, dispatch),
  // getCategoryAction: bindActionCreators(getCategory, dispatch),
  getPrimaryTag : bindActionCreators(getPrimaryTag,dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPrimaryCategory);

