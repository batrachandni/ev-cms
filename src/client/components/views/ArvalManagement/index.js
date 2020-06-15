import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getArvalList } from "./action";
import Table from "../../General/Table";

class ArvalManagement extends React.Component {
  constructor(props) {
    super(props);
  }
 async componentDidMount() {
   await this.props.getArvalList();
  }

  render() {
    const { ArvalList } = this.props;
    return (
      <div className="wrapper">
        <div className="title">
          <h3>Arval Management</h3>
          {/* <button className="btn btn-primary customButton" type="button" onClick={this.addCategoryManagement}>Add Tag</button> */}
        </div>
        <Table 
        type="ARVAL_TABLE" 
        pageSize={30}
        minRows={0}
        data={ArvalList}/>
      </div>
    );
  }
}

const mapStateToProps = ({ ArvalManagementReducer }) => ({
  ArvalList: ArvalManagementReducer.ArvalList,
  status: ArvalManagementReducer.status,
  message: ArvalManagementReducer.message
});

const mapDispatchToProps = dispatch => ({
  getArvalList: bindActionCreators(getArvalList, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArvalManagement);
