import React from "react";
import Modal from "react-modal";
import { saveAs } from "file-saver";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Select from "react-select";
import CsvDownloader from "react-csv-downloader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Table from "../../General/Table";
import Pagination from "react-js-pagination";
import URLS from "../../../utils/urlConstant";
import { getVehicleData } from "./action";
import {
  updateAssignTag,
  UpdateCapById,
  updateAssignTagSec,
  updateAssignTagTer
} from "./action";
import { getCategory } from "../SecondaryCategory/action";
import { getPrimaryTag } from "../PrimaryCategory/action";
import { getTertiaryTag } from "../TertiaryCategory/action";
import {
  assignTagList,
  uploadFile,
  deleteVehicleData,
  getCountAffectedFields,
  getCountOfData,
  downloadArvalsheet,
  handleConformData
} from "./action";

class VehicleManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModalViewImages: false,
      showModalForReview: false,
      optionsdata: [],
      capId: "",
      selectedOptionP: {},
      selectedOptionS: [],
      selectedOptionT: [],
      selectedFile: null,
      categoryId: "",
      categoryKey: "",
      tagId: "",
      tagKey: "",
      images: [],
      cagT: null,
      msgS: null,
      imageShow: null,
      skip: 0,
      limit: 10,
      disabled: true,
      VehicleData: props.VehicleData,
      capid: "",
      id: "",
      activePage: 1
    };
    this.handleAssignTagModal = this.handleAssignTagModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleVehicleEdit = this.handleVehicleEdit.bind(this);
    this.handleUpdateCapData = this.handleUpdateCapData.bind(this);
    this.handleViewImages = this.handleViewImages.bind(this);
    this.hanldeTagDelete = this.hanldeTagDelete.bind(this);
    this.handleAssignModalSec = this.handleAssignModalSec.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    // this.handlePageChange =  this.handlePageChange(this);
  }

  async componentDidMount() {
    // await this.props.downloadArvalsheet();
    const { skip, limit } = this.state;
    await this.props.getCountOfData();
    await this.props.getVehicleData({ skip, limit });
  }

  async onPageChange(step) {
    const { limit } = this.state;
    if (step === "next") {
      this.setState({ disabled: false });
      await this.setState(prevState => ({ skip: prevState.skip + 10 }));
    } else if (this.state.skip < 10) {
      this.setState({ disabled: true });
      // await this.setState({ skip: skip + 10 });
    } else {
      this.setState({ disabled: false });
      await this.setState(prevState => ({ skip: prevState.skip - 10 }));
    }
    await this.props.getVehicleData({ skip: this.state.skip, limit });
  }

  handleChangeSelect(value) {
    let updatedState = {};
    switch (this.state.cagT) {
      case 1:
        updatedState = { selectedOptionP: value };
        break;
      case 2:
        updatedState = { selectedOptionS: value };
        break;
      case 3:
        updatedState = { selectedOptionT: value };
        break;
      default:
        updatedState = {};
    }
    this.setState({ ...updatedState });
  }

  async handleAssignTagModal(id) {
    this.setState({ capid: id });
    await this.props.getPrimaryTag();
    this.setState({ showModal: true, cagT: 1 });
    const { tagList, VehicleData } = this.props;
    let data = [];
    if (tagList.length) {
      data = this.props.tagList.reduce((arr, category) => {
        return arr.concat({
          value: category.key,
          _id: category._id,
          label: category.key
        });
      }, []);
      this.setState({ optionsdata: data, capId: id });
    }
    const selectedVehicle = VehicleData.find(
      VehicleData => VehicleData.CAPID.value === id
    );
    const value =
      selectedVehicle.carverterCategory.value === null
        ? "null"
        : selectedVehicle.carverterCategory.value.name;
    // this.setState({ selectedOptionP: value ? { value, label: value} : "" });
    this.setState({
      selectedOptionP: value
        ? {
            value,
            label: value,
            id: selectedVehicle.carverterCategory.value._id
          }
        : ""
    });
  }

  hanldePrimaryUpdateAfterConfirm = async () => {
    const { tagList, VehicleData } = this.props;
    const { capId, selectedOptionP } = this.state;
    const tag = tagList.find(tag => selectedOptionP._id === tag._id);
    await this.props.updateAssignTag({ tagList: tag, capId });
    const selectedVehicle = VehicleData.find(
      VehicleData => VehicleData.CAPID.value === capId
    );
    let carverterCategory = selectedVehicle.carverterCategory;
    carverterCategory = {
      ...carverterCategory,
      value: tag
    };
    selectedVehicle.carverterCategory = carverterCategory;
    await this.handleCloseModal();
    await this.setState({ VehicleData: selectedVehicle });
    // await this.handleCloseModal();
    await this.props.getVehicleData({
      skip: this.state.skip,
      limit: this.state.limit
    });
  };

  hanldePrimaryUpdate = async () => {
    await this.props.getCountAffectedFields({ capId: this.state.capid });
    await this.handleCloseModal();
    await this.setState({ showModalForReview: true, msgS: 1 });
  };

  async handleAssignModalSec(id) {
    await this.props.getCategory();
    this.setState({ showModal: true, cagT: 2 });
    const { categoryList, VehicleData } = this.props;
    let data = [];
    if (categoryList.length) {
      data = this.props.categoryList.reduce((arr, category) => {
        return arr.concat({
          value: category.name,
          _id: category._id,
          label: category.name
        });
      }, []);
      this.setState({ optionsdata: data, capId: id });
    }
    this.setSelectedOption(id, "secondaryTag", "selectedOptionS");
  }
  async handleAssignModalTer(id) {
    await this.props.getTertiaryTag();
    this.setState({ showModal: true, cagT: 3 });
    const { tertiaryList, VehicleData } = this.props;
    let data = [];
    if (tertiaryList.length) {
      data = this.props.tertiaryList.reduce((arr, category) => {
        return arr.concat({
          value: category.name,
          _id: category._id,
          label: category.name
        });
      }, []);
      this.setState({ optionsdata: data, capId: id });
    }
    this.setSelectedOption(id, "tertiaryTag", "selectedOptionT");
  }

  setSelectedOption = (id, tag, updateState) => {
    const { VehicleData } = this.props;
    const selectedVehicle = VehicleData.find(
      VehicleData => VehicleData.CAPID.value === id
    );
    const updateTag = selectedVehicle[tag];
    const options =
      updateTag.length &&
      updateTag.reduce((arr, tag) => {
        return arr.concat({ label: tag.name, value: tag.name, _id: tag._id });
      }, []);
    this.setState({ [updateState]: options || [] });
  };

  async handleUpdate() {
    switch (this.state.cagT) {
      case 1:
        await this.hanldePrimaryUpdate();
        break;
      case 2:
        await this.hanldeSecondaryUpdate();
        break;
      case 3:
        await this.handleTertiaryUpdate();
        break;
    }
    // this.handleCloseModal();
  }
  handleSecondaryUpdate = async () => {
    const { categoryList, VehicleData } = this.props;
    const { capId, selectedOptionS } = this.state;
    const data = selectedOptionS.reduce((arr, option) => {
      return arr.concat(categoryList.find(tag => option._id === tag._id));
    }, []);
    await this.props.updateAssignTagSec({ tagList: data, capId });
    const selectedVehicle = VehicleData.find(
      VehicleData => VehicleData.CAPID.value === capId
    );
    selectedVehicle.secondaryTag = data;
    await this.setState({ VehicleData: selectedVehicle });
  };

  handleTertiaryUpdate = async () => {
    const { tertiaryList, VehicleData } = this.props;
    const { capId, selectedOptionT } = this.state;
    const data = selectedOptionT.reduce((arr, option) => {
      return arr.concat(tertiaryList.find(tag => option._id === tag._id));
    }, []);
    await this.props.updateAssignTagTer({ tagList: data, capId });
    const selectedVehicle = VehicleData.find(
      VehicleData => VehicleData.CAPID.value === capId
    );
    selectedVehicle.tertiaryTag = data;
    await this.setState({ VehicleData: selectedVehicle });
    await this.handleCloseModal();
  };

  async handleViewImages(id) {
    const vehicleImages = this.props.VehicleData.find(
      vehicle => vehicle.CAPID.value === id
    );

    await this.setState({
      images:
        vehicleImages.images.value.length != 0
          ? vehicleImages.images.value
          : null
    });
    if (this.state.images != null) {
      await this.setState({
        showModalViewImages: true
      });
    } else {
      await this.setState({
        showModalForReview: true,
        msgS: 5
      });
    }
  }

  async handleCloseModal() {
    await this.setState({ showModal: false });
    await this.setState({ showModalViewImages: false });
    await this.setState({ showModalForReview: false });
  }

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    await this.props.uploadFile(formData);
    if (this.props.uploadfilestatus) {
       this.setState({ showModalForReview: true, msgS: 3 });
    } else {
      this.setState({ showModalForReview: true, msgS: 6 });
    }
  };

  handleVehicleEdit(id) {
    this.props.history.push(`${URLS.EditVehicleData}/${id}`);
  }

  async handleUpdateCapData(id) {
    await this.props.UpdateCapById({ capId: id });
    if(this.props.statusUpdateCapData){
      await this.setState({ showModalForReview: true, msgS: 3 });
    }
    else{
      await this.setState({ showModalForReview: true, msgS: 2 });
    }
    
  }
  hanldeTagDelete(id) {
    this.setState({ showModalForReview: true, id: id, msgS: 4 });
  }

  hanldePrimaryDeleteConfirm = async () => {
  await  this.props.deleteVehicleData(this.state.id);
   await this.props.getVehicleData({
      skip: this.state.skip,
      limit: this.state.limit
    });
    await this.handleCloseModal();
  };
  handlePageChange = async pageNumber => {
    await this.setState({ activePage: pageNumber });
    let pageNumberr = pageNumber - 1;
    await this.setState({ skip: pageNumberr * 10 });
    this.props.getVehicleData({
      skip: this.state.skip,
      limit: this.state.limit
    });
  };

  handleDownload = async () => {
    await this.props.downloadArvalsheet();
    if(this.props.statusdownload){
      this.setState({showModalForReview : true, msgS:7})
    }
    else {
      this.setState({showModalForReview : true, msgS:2})
    }
 };
 handleCAPUpdateData = async ()=>{
  await this.setState({ showModalForReview: true, msgS: 8 });
 }
 hanldeUpdateConfirm = async() =>{
   await this.props.handleConformData();
  if(status){
    await this.setState({ showModalForReview: true, msgS: 9 });
  }else{
    await this.setState({ showModalForReview: true, msgS: 2});
  }
 }
  render() {
    let today = new Date();
    let filename = `vehicle-data-${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}.xls`;
    const { VehicleData, countedtotaldata,messageFileUpload} = this.props;
    const { cagT, limit, msgS, imageShow } = this.state;
    const dataTable = VehicleData.map(data => {
      let dataObj = {};
      dataObj = {
        CAPID: data.CAPID.value,
        CAPCode: data.CAPCode.value,
        Brand: Object.keys(data).includes("Brand") ? data.Brand.value : "null",
        Model: data.Model.value,
        Images: data.images.value,
        Primary:
          data.carverterCategory.value === null
            ? "null"
            : data.carverterCategory.value.name
      };
      return dataObj;
    });
    const images = this.state.images;
    const options = this.state.optionsdata;
    const { sheetdata } = this.props;
    return (
      <div className="wrapper">
        <div className="title">
          <h3>Vehicle Management</h3>
           <div className="file-container">
          <div className="upload-btn-wrapper">
              <h3 className="btn-Arval_uploads">Select Arval File (only xlxs and xls format)</h3>
           </div>
     
          <input
              type="file"
              name="myfile"
              onChange={this.fileChangedHandler}
            />
            <button
              type="submit"
              className="btn btn-primary customButton"
              onClick={this.uploadHandler}
            >
              Upload
            </button>
   
          </div>
          {/* <span>
        <p>Total {this.props.countedtotaldata} Vehicle</p>
        </span> */}
        </div>
        <div className="download-sheet">
          <span>   
          <span className="download-sheet-container">Update CAP DATA (For all vehicles)</span>
          <button  className ="btn btn-primary customButton" onClick ={this.handleCAPUpdateData}>Update</button>
          </span>
          <span>
          <span className="download-sheet-container">Download Arval Sheet</span>
          <button  className ="btn btn-primary customButton" onClick ={this.handleDownload}>Download Link</button> 
          </span>
          </div>
         <Table
          type="CAR_MANAGEMENT"
          data={dataTable}
          hide={true}
          pageSize={30}
          minRows={0}
          handleViewName={id => this.handleAssignTagModal(id)}
          handleViewNameSec={id => this.handleAssignModalSec(id)}
          handleViewNameTer={id => this.handleAssignModalTer(id)}
          handleVehicleEdit={id => this.handleVehicleEdit(id)}
          handleUpdateCapData={id => this.handleUpdateCapData(id)}
          handleViewImages={id => this.handleViewImages(id)}
          handleDelete={id => this.hanldeTagDelete(id)}
        />
        <span className="button-container">
          <button
            className="previous-next-btn"
            type="button"
            disabled={this.state.disabled}
            onClick={() => this.onPageChange("previous")}
          >
            Previous
          </button>
          <div>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={10}
              totalItemsCount={countedtotaldata}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>

          <button
            className="previous-next-btn"
            type="button"
            onClick={() => this.onPageChange("next")}
          >
            Next
          </button>
        </span>

        <Modal
          className="modal-assign-tag"
          isOpen={this.state.showModal}
          isScrollable={true}
          contentLabel="Minimal Modal Example"
        >
          <span className="heading-container">
            <h3>Assign Tag</h3>
          </span>
          {cagT === 1 && (
            <Select
              value={this.state.selectedOptionP}
              onChange={this.handleChangeSelect}
              options={options}
            />
          )}
          {cagT === 2 && (
            <Select
              isMulti={true}
              value={this.state.selectedOptionS}
              onChange={this.handleChangeSelect}
              options={options}
            />
          )}
          {cagT === 3 && (
            <Select
              isMulti={true}
              value={this.state.selectedOptionT}
              onChange={this.handleChangeSelect}
              options={options}
            />
          )}
          <div className="buttons-container">
            <image
              style={{ top: "-15px", right: "-13px" }}
              rel="modal:close"
              onClick={this.handleCloseModal}
              className="close-modal"
            ></image>
            <button
              className=" btn btn-primary buttonsColor"
              onClick={this.handleUpdate}
            >
              Update
            </button>
          </div>
        </Modal>
        <Modal
          className="modal-image-tag"
          isOpen={this.state.showModalViewImages}
          contentLabel="Minimal Modal Example"
        >
          <div>
            <Carousel showArrow={false}>
              {images &&
                images.map(src => (
                  <span>
                    <img src={src} />
                  </span>
                ))}
            </Carousel>
            <div className="buttons-container">
              <image
            
                rel="modal:close"
                onClick={this.handleCloseModal}
                className="close-modal"
              ></image>
            </div>
          </div>
        </Modal>
        <Modal
          className="modal-assign-tag"
          isOpen={this.state.showModalForReview}
          isScrollable={true}
          contentLabel="Minimal Modal Example"
        >
          {msgS === 1 && (
            <div>
              <span className="heading-container">
                <h3>Update {this.props.count} others similar cars</h3>
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
                  this.hanldePrimaryUpdateAfterConfirm();
                }}
              >
                Yes
              </button>
            </div>
          )}

          {msgS === 2 && (
            <div>
              <span className="heading-container">
                <h3>Upload Unsuccessful</h3>
              </span>
              <button
                className="btn btn-primary buttonsColor"
                onClick={() => {
                  this.handleCloseModal();
                }}
              >
                Okay
              </button>
            </div>
          )}

          {msgS === 3 && (
            <div>
              <span className="heading-container">
                <h3>SUCCESSFUL</h3>
              </span>
              <button
                className=" btn btn-primary buttonsColor"
                onClick={() => {
                  this.handleCloseModal();
                }}
              >
                Okay
              </button>
            </div>
          )}
          {msgS === 4 && (
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
          )}
          {msgS === 5 && (
            <div>
              <span className="heading-container">
                <h3>No Image Available</h3>
              </span>

              <image
                rel="modal:close"
                onClick={this.handleCloseModal}
                className="close-modal"
              ></image>
            </div>
          )}
          {msgS === 6 && (
            <div>
              <span className="heading-container">
                <h3>{messageFileUpload}</h3>
              </span>
              <button
                className="btn btn-primary buttonsColor"
                onClick={() => {
                  this.handleCloseModal();
                }}
              >
                Okay
              </button>
            </div>
          )}
             {msgS === 7 && (
            <div>
               <span className="heading-container">
                <h3>Your file is ready for download!</h3>
              </span>
          <CsvDownloader
            filename = {filename}
            datas = {sheetdata}
            text= "Download "
            />
              <image
                rel="modal:close"
                onClick={this.handleCloseModal}
                className="close-modal"
              ></image>
            </div>
          )}
           {msgS === 8 && (
            <div>
               <span className="heading-container">
                <h3> Do you want to update CAP Data for all the vehicles ?</h3>
              </span>
              <button
                className=" btn btn-primary buttonsColor"
                onClick={() => {
                  this.hanldeUpdateConfirm();
                }}
              >
                Update
              </button>
              <image
                rel="modal:close"
                onClick={this.handleCloseModal}
                className="close-modal"
              ></image>
            </div>
          )}
                    {msgS === 9 && (
            <div>
              <span className="heading-container">
                <h3> Success ! Please wait for a while for CAP Data  to update.</h3>
              </span>
              <button
                className=" btn btn-primary buttonsColor"
                onClick={() => {
                  this.handleCloseModal();
                }}
              >
                Okay
              </button>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({
  vehicleManagementReducer,
  PrimaryCategoryReducer,
  SecondaryCategoryReducer,
  tertiaryCategoryReducer
}) => ({
  VehicleData: vehicleManagementReducer.VehicleData,
  uploadfilestatus: vehicleManagementReducer.uploadfilestatus,
  status: vehicleManagementReducer.status,
  message: vehicleManagementReducer.message,
  tagList: PrimaryCategoryReducer.tags,
  categoryList: SecondaryCategoryReducer.category,
  tertiaryList: tertiaryCategoryReducer.tertiaryList,
  count: vehicleManagementReducer.count,
  countedtotaldata: vehicleManagementReducer.countedtotaldata,
  sheetdata: vehicleManagementReducer.sheetdata,
  statusdownload : vehicleManagementReducer.statusdownload,
  messageFileUpload : vehicleManagementReducer.messageFileUpload,
  statusUpdateCapData : vehicleManagementReducer.statusUpdateCapData,
  statusAllCap : vehicleManagementReducer.statusAllCap,
});

const mapDispatchToProps = dispatch => ({
  getVehicleData: bindActionCreators(getVehicleData, dispatch),
  assignTagList: bindActionCreators(assignTagList, dispatch),
  updateAssignTag: bindActionCreators(updateAssignTag, dispatch),
  uploadFile: bindActionCreators(uploadFile, dispatch),
  UpdateCapById: bindActionCreators(UpdateCapById, dispatch),
  deleteVehicleData: bindActionCreators(deleteVehicleData, dispatch),
  getCategory: bindActionCreators(getCategory, dispatch),
  getTertiaryTag: bindActionCreators(getTertiaryTag, dispatch),
  getPrimaryTag: bindActionCreators(getPrimaryTag, dispatch),
  updateAssignTagSec: bindActionCreators(updateAssignTagSec, dispatch),
  updateAssignTagTer: bindActionCreators(updateAssignTagTer, dispatch),
  getCountAffectedFields: bindActionCreators(getCountAffectedFields, dispatch),
  getCountOfData: bindActionCreators(getCountOfData, dispatch),
  downloadArvalsheet: bindActionCreators(downloadArvalsheet, dispatch),
  handleConformData : bindActionCreators(handleConformData,dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleManagement);
