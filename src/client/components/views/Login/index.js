import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUserAction } from "./action";
import URLS from "../../../utils/urlConstant";
import "./login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      errormessage: "",
      errormessage1: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);

    if (props.authUser.token) {
      props.history.push(URLS.PrimaryCategory);
     }
 }
 handleChange(e) {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
  }
  async handleLoginButton(e) {
    e.preventDefault();
    const { email, pass } = this.state;
    if (email == "" || pass == "") {
      this.setState({
        errormessage: " UserName cannot be empty",
        errormessage1: "password cannot be empty"
      });
    } else {
      this.setState({ errormessage: "", errormessage1: "" });
      await this.props.addlogindata({ userName: email, password: pass });
      if (this.props.status) {
        const {
          authUser: { token }
        } = this.props;
        token && this.props.history.push(URLS.PrimaryCategory);
      }
    }
  }
  render() {
    return (
      <div className="pageWrap">
        <div className="innerPage">
          <div className="logo-container"></div>
          <div className="text-center">
            <h3>Admin Portal</h3>
          </div>

          <div className="inner-content">
            <form onSubmit={this.handleLoginButton}>
              <div className="panel-body">
                <div className="error-message-container">{this.props.data}</div>
                <div className="form-group">
                  <label className="nameLabel">UserName</label>
                  <input
                    type="text"
                    placeholder="Please enter the  email"
                    name="email"
                    id="email"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.email}
                  ></input>
                </div>
                {this.state.errormessage}
                <div className="form-group">
                  <label className="passwordLabel">Password</label>
                  <input
                    type="password"
                    placeholder="******"
                    onChange={this.handleChange}
                    name="pass"
                    id="password"
                    className="form-control"
                    value={this.state.pass}
                  ></input>
                </div>
                {this.state.errormessage1}
                <button
                  className="btn btn-success btn-block loginbtn"
                  type="submit"
                  value="submit"
                >
                  Login
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
  status: loginReducer.status,
  message: loginReducer.message,
  data: loginReducer.data
});

const mapDispatchToProps = dispatch => ({
  addlogindata: data => dispatch(loginUserAction(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
