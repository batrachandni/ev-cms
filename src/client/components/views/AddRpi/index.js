import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addRpiListAction, getRpiList } from "../RpiManagement/action";
import URLS from "../../../utils/urlConstant";

class AddRpiManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      rate: "",
      errormsgforyear: "",
      errormsgforrate: "",
      errormsgforcmn: "",
      errorforduplicate: ""
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
    const { year, rate } = this.state;
    let isYearCorrect = false;
    let isRateCorrect = false;

    if (this.state.year == "" || this.state.rate == "") {
      this.setState({
        errorforduplicate: "Fields shouls not be empty",
        errormsgforyear: "",
        errormsgforrate: ""
      });
    } else {
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
        await this.props.addRpiListAction({
          year: year,
          rate: rate
        });

        if (this.props.status) {
          await this.props.getRpiList();
          await this.props.history.push(URLS.RpiManagement);
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
    return (
      <div className="edit-user-container">
        <h3 className="heading">RPI Management</h3>
        <div className="ErrorMessageContainer"> {this.state.errormessage} </div>
        <form>
        <span className= "ErrorMessageContainer">{this.state.errorforduplicate}</span>
        <span className= "ErrorMessageContainer">{this.state.errormsgforcmn}</span>
          <div className="form-group">
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
              placeholder="Rate"
              onChange={e => this.handleChange(e, "rate")}
              value={this.state.rate}
            ></input>
            <span className= "ErrorMessageContainer"> {this.state.errormsgforrate}</span>
          </div>
          <br />
          <div class="bottom-button-padding">
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
const mapStateToProps = ({ RpiManagmentReducer }) => ({
  status: RpiManagmentReducer.status,
  message: RpiManagmentReducer.message
});
const mapDispatchToProps = dispatch => ({
  addRpiListAction: bindActionCreators(addRpiListAction, dispatch),
  getRpiList: bindActionCreators(getRpiList, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRpiManagement);

