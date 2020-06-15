import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { bindActionCreators } from "redux";
import { getPrimaryTag } from "./action";
import { deleteTag } from "./action";
import URLS from "../../../utils/urlConstant";
import Table from "../../General/Table";

class PrimaryCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalForReview: false,
      id: ""
    };
    /* 
		//Only use if you want to render the component with SSR
		loadHomeData();
		*/
    this.showAddPrimaryCategory = this.showAddPrimaryCategory.bind(this);
    this.hanldePrimaryDelete = this.hanldePrimaryDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getData = this.getData.bind(this);
    this.getCategoryListTag = this.getCategoryListTag.bind(this);
  }

  componentDidMount() {
    this.props.getPrimaryTag();
  }

  showAddPrimaryCategory() {
    this.props.history.push(URLS.AddPrimaryCategory);
  }

  async hanldePrimaryDelete(id) {
    this.setState({ showModalForReview: true, id: id });
  }

  hanldePrimaryDeleteConfirm = async () => {
    await this.props.deleteTag({ tagId: this.state.id });
    await this.props.getPrimaryTag();
    await this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.setState({ showModalForReview: false });
  };

  handleEdit(id) {
    this.props.history.push(`${URLS.EditPrimaryCategory}/${id}`);
  }

  getData(tags) {
    if (tags.length) {
      return tags.reduce((arr, tag) => {
        return arr.concat({
          _id: tag._id,
          name: tag.name,
          description: tag.description,
          categoryList: this.getCategoryListTag(tag.categoryList)
        });
      }, []);
    }
    return [];
  }
  getCategoryListTag(primaryCategoryList) {
    if (primaryCategoryList)
      return primaryCategoryList.reduce((str, category, index) => {
        if (index === primaryCategoryList.length - 1)
          return str.concat(`${category.name}`);
        return str.concat(`${category.name}, `);
      }, "");
    return "";
  }

  render() {
    const { tags } = this.props;
    return (
      <div className="wrapper">
        <div className="title">
          <h3>Primary Category</h3>
          <button
            className="btn btn-primary customButton"
            type="button"
            onClick={this.showAddPrimaryCategory}
          >
            Add Category
          </button>
        </div>
        <Table
           pageSize={30}
           minRows={0}
          type="TAG_TABLE"
          data={this.getData(tags)}
          handleDelete={id => this.hanldePrimaryDelete(id)}
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

const mapStateToProps = ({ PrimaryCategoryReducer }) => ({
  tags: PrimaryCategoryReducer.tags,
  status: PrimaryCategoryReducer.status,
  message: PrimaryCategoryReducer.message
});

const mapDispatchToProps = dispatch => ({
  getPrimaryTag: bindActionCreators(getPrimaryTag, dispatch),
  deleteTag: bindActionCreators(deleteTag, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryCategory);
