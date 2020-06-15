import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { bindActionCreators } from "redux";
import { getTertiaryTag, deleteTertiaryTag } from "./action";
import URLS from "../../../utils/urlConstant";
import Table from "../../General/Table";

class tertiaryCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalForReview: false,
      id: ""
    };
    this.hanldeTagDelete = this.hanldeTagDelete.bind(this);
    this.addCategoryManagement = this.addCategoryManagement.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentDidMount() {
    this.props.getTertiaryTag();
  }

  addCategoryManagement() {
    this.props.history.push(URLS.AddtertiaryTag);
  }

  async hanldeTagDelete(id) {
    this.setState({ showModalForReview: true, id: id });
  }

  hanldePrimaryDeleteConfirm = async () => {
    // await this.props.deleteTag({ tagId: this.state.id });
    await this.props.deleteTertiaryTag(this.state.id);
    await this.props.getTertiaryTag();
    await this.handleCloseModal();
  };
  handleCloseModal = () => {
    this.setState({ showModalForReview: false });
  };

  handleEdit(id) {
    this.props.history.push(`${URLS.EditTertiaryTag}/${id}`);
  }

  render() {
    const { tertiaryList } = this.props;
    return (
      <div className="wrapper">
        <div className="title">
          <h3>End Use Tags</h3>
          <button
            className="btn btn-primary customButton"
            type="button"
            onClick={this.addCategoryManagement}
          >
            Add Tag
          </button>
        </div>
        <Table
          pageSize={30}
          minRows={0}
          type="TERTIARY_CATEGORY"
          data={tertiaryList}
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

const mapStateToProps = ({ tertiaryCategoryReducer }) => ({
  tertiaryList: tertiaryCategoryReducer.tertiaryList,
  status: tertiaryCategoryReducer.status,
  message: tertiaryCategoryReducer.message
});

const mapDispatchToProps = dispatch => ({
  getTertiaryTag: bindActionCreators(getTertiaryTag, dispatch),
  deleteTertiaryTag: bindActionCreators(deleteTertiaryTag, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(tertiaryCategory);
