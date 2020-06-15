import React, { Component } from "react";

class CustomButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button
          className="customButton btn btn-primary "
          onClick={this.props.handleEdit}
        >
          Edit
        </button>
        &nbsp;&nbsp;
        <button
          className="customButtonDelete btn btn-danger"
          onClick={this.props.handleDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default CustomButton;
