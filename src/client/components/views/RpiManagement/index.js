import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { bindActionCreators } from "redux";
import { getRpiList, deleteRpiList } from "./action";
import URL from "../../../utils/urlConstant";
import Table from "../../General/Table";

class RpiManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalForReview: false,
      id: ""
    };
    this.addRpiManagement = this.addRpiManagement.bind(this);
    this.hanldeTagDelete = this.hanldeTagDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentDidMount() {
    this.props.getRpiList();
  }

  addRpiManagement() {
    this.props.history.push(URL.AddRpiManagement);
  }

  async hanldeTagDelete(id) {
    this.setState({ showModalForReview: true, id: id });
  }

  hanldePrimaryDeleteConfirm = async () => {
    await this.props.deleteRpiList(this.state.id);
    await this.props.getRpiList();
    await this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.setState({ showModalForReview: false });
  };

  handleEdit(id) {
    this.props.history.push(`${URL.EditRpiList}/${id}`);
  }
  render() {
    const { RpiList } = this.props;
    return (
      <div className="wrapper">
        <div className="title">
          <h3>RPI Management</h3>
          <button
            className="btn btn-primary customButton"
            type="button"
            onClick={this.addRpiManagement}
          >
            Add RPI
          </button>
        </div>
        <Table
          type="RPI_MANAGEMENT"
          data={RpiList}
          pageSize={30}
          minRows={0}
          handleDelete={id => this.hanldeTagDelete(id)}
          handleEdit={id => this.handleEdit(id)}
        />
        <Modal
          className="modal-assign-tag"
          isOpen={this.state.showModalForReview}
          isScrollable={true}
          contentLabel="Minimal Modal Example"
        >
          <div>
            <span className="heading-container">
              <h3>Are you sure to delete the data ?</h3>
            </span>
            <button
              className=" btn btn-primary buttonsColor"
              onClick={() => {
                this.handleCloseModal();
              }}
            >
              No
            </button>
            <button
              className=" btn btn-primary buttonsColor"
              onClick={() => {
                this.hanldePrimaryDeleteConfirm();
              }}
            >
              Yes
            </button>
          </div>
        </Modal>
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
  getRpiList: bindActionCreators(getRpiList, dispatch),
  deleteRpiList: bindActionCreators(deleteRpiList, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RpiManagement);
