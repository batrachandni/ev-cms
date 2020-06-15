import React, { Component } from "react";
import { connect } from "react-redux";
import { changePasswordAction } from "../Login/action";
import "./ChangePassword.scss";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: "",
      newpass: "",
      confmpass: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  handleChange(e) {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
  }
  updatePassword(e) {
    e.preventDefault();
    const oldpass = this.state.oldpassword;
    const newpass = this.state.newpass;
    const confmpass = this.state.confmpass;
    if (newpass === confmpass) {
      this.props.changePasswordAction({
        oldPassword: oldpass,
        newPassword: newpass
      });
      this.props.history.push(URLS.PrimaryCategory);
    }
  }
  render() {
    return (
      <div className="pageWrap">
        <div className="innerPage">
          <div className="text-center">
            <h3>Change Password</h3>
          </div>
          <div className="inner-content">
            <form onSubmit={this.updatePassword}>
              <div className="panel-body">
                <div className="form-group">
                  <label className="passwordLabel">OldPassword</label>
                  <input
                    type="password"
                    placeholder="Old-Password"
                    name="oldpassword"
                    id="oldpass"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.oldpassword}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="passwordLabel">NewPassword</label>
                  <input
                    type="password"
                    placeholder="New-Password"
                    onChange={this.handleChange}
                    name="newpass"
                    id="newpass"
                    className="form-control"
                    value={this.state.newpass}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="passwordLabel">ConfirmPassword</label>
                  <input
                    type="password"
                    placeholder="Confirm-Password"
                    onChange={this.handleChange}
                    name="confmpass"
                    id="confmpass"
                    className="form-control"
                    value={this.state.confmpass}
                  ></input>
                </div>
                <button
                  className="btn btn-success btn-block loginbtn"
                  type="submit"
                  value="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({
  authUser: loginReducer.user,
  status: loginReducer.status
});

const mapDispatchToProps = dispatch => ({
  changePasswordAction: data => dispatch(changePasswordAction(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
