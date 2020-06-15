import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCategory } from "./action";
import { deleteCategory } from "./action";
import URL from "../../../utils/urlConstant";
import Table from "../../General/Table";

class SecondaryCategory extends React.Component {
  constructor(props) {
    super(props);
    this.addCategoryManagement = this.addCategoryManagement.bind(this);
  }
  componentDidMount() {
    this.props.getCategory();
  }

  addCategoryManagement() {
    this.props.history.push(URL.AddSecondaryCategory);
  }

  async hanldeTagDelete(id) {
    await this.props.deleteCategory({tagId: id});
    this.props.getCategory();
  }
  handleEdit(id) {
    this.props.history.push(`${URL.EditSecondaryCategory}/${id}`);
  }
  render() {
    const { category } = this.props;
    return (
      <div className="wrapper">
        <div className="title">
          <h3>Secondary Category</h3>
          <button
            className="btn btn-primary customButton"
            type="button"
            onClick={this.addCategoryManagement}
          >
            Add Category
          </button>
        </div>
        <Table
          data={category}
          pagesize ={10}
          handleDelete={id => this.hanldeTagDelete(id)}
          handleEdit={id => this.handleEdit(id)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ SecondaryCategoryReducer }) => ({
  category: SecondaryCategoryReducer.category,
  status: SecondaryCategoryReducer.status,
  message: SecondaryCategoryReducer.message
});

const mapDispatchToProps = dispatch => ({
  getCategory: bindActionCreators(getCategory, dispatch),
  deleteCategory: bindActionCreators(deleteCategory, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryCategory);
