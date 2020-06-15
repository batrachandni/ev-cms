import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateRpiList } from "../RpiManagement/action";
import URLS from "../../../utils/urlConstant";

class EditRpiList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      rate: "",
      errormsgforyear: "",
      errormsgforrate: "",
      errormsgforcmn: "",
      errorforduplicate: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateRpiListManage = this.updateRpiListManage.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { RpiList } = this.props;
    const tag = this.props.RpiList.find(
      item => item._id === this.props.match.params.id
    );
    const { year = "", rate = "" } = tag || {};
    this.setState({
      year,
      rate
    });
  }
  handleChange(e, key) {
    this.setState({ [key]: e.target.value });
  }
async  updateRpiListManage() {
    const { year, rate } = this.state;
    let isYearCorrect = false;
    let isRateCorrect = false;

    if(this.state.year == "" || this.state.rate == ""){
      this.setState({
        errorforduplicate: "Fields shouls not be empty",
        errormsgforyear: "",
        errormsgforrate: ""
      });
      
   }

   else {
    if (
      this.state.year.toString().charAt(0) == 0 ||
      this.state.year.toString().length != 4 ||
      isNaN(this.state.year)
    ) {
      this.setState({
        errormsgforyear: "Year is not correct",
        errorforduplicate: "",
        errormsgforcmn: ""
      });
      isYearCorrect = false;
    } else {
      this.setState({ errormsgforyear: "", errorforduplicate: "" });
      isYearCorrect = true;
    }

    if (isNaN(this.state.rate)) {
      this.setState({
        errormsgforrate: "Rate is not correct",
        errorforduplicate: "",
        errormsgforcmn: ""
      });
      isRateCorrect = false;
    } else {
      this.setState({ errormsgforrate: "", errorforduplicate: "" });
      isRateCorrect = true;
    }

    if (isYearCorrect && isRateCorrect) {
      await this.props.updateRpiList({ year, rate, id: this.props.match.params.id });

      if (this.props.status) {
    await  this.props.history.push(URLS.RpiManagement);
      } else {
        this.setState({
          errormsgforcmn: "Duplicated data",
          errormsgforrate: "",
          errormsgforyear: "",
          errorforduplicate: ""
        });
      }
    }
  }

   
  }
  cancelEdit() {
    this.props.history.push(URLS.RpiManagement);
  }

  render() {
    const { RpiList } = this.props;
    return (
      <div className="edit-user-container">
        <h3 className="heading">RPI Management</h3>
        <div className="form-group">
        <span className= "ErrorMessageContainer">{this.state.errorforduplicate}</span>
        <span className= "ErrorMessageContainer">{this.state.errormsgforcmn}</span>
          <label>Year:</label>
          <input
            type="text"
            name="year"
            className="form-control"
            placeholder="Year"
            onChange={e => this.handleChange(e, "year")}
            value={this.state.year}
          ></input>
           <span className= "ErrorMessageContainer">{this.state.errormsgforyear}</span>
        </div>
        <div className="form-group">
          <label>Rate:</label>
          <input
            type="text"
            name="rate"
            className="form-control"
            placeholder="rate"
            onChange={e => this.handleChange(e, "rate")}
            value={this.state.rate}
          ></input>
           <span className= "ErrorMessageContainer"> {this.state.errormsgforrate}</span>
        </div>
        <br />
        <div className="bottom-button-padding">
          <button
            className="btn btn-primary customButton"
            onClick={this.updateRpiListManage}
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

const mapStateToProps = ({ RpiManagmentReducer }) => ({
  RpiList: RpiManagmentReducer.RpiList,
  status: RpiManagmentReducer.status,
  message: RpiManagmentReducer.message
});

const mapDispatchToProps = dispatch => ({
  updateRpiList: bindActionCreators(updateRpiList, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRpiList);
