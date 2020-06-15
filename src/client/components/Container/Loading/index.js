import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeloaderstatus } from "../../../layout/Website/Website.action";
import "./style.scss";

class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={
          !this.props.isLoaderVisible ? "loader-bg hide-loader" : "loader-bg"
        }
      >
        <div className="loaders">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoaderVisible: state.websiteReducer && state.websiteReducer.isLoaderVisible
});

const mapDispatchToProps = dispatch => ({
  changeloaderstatus: bindActionCreators(changeloaderstatus, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
