import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getVehicleData, updateVehicleData } from "../VehicleManagement/action";
import URLS from "../../../utils/urlConstant";

class EditVehicleData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      value: "",
      selectedOption: { value: null, label: "Other" },
      vehicles: props.VehicleData && props.VehicleData.find(item => item.CAPID.value === Number(this.props.match.params.id)),
      disabled: "false",
      dataObj: {},
       vech_category: this.get_vech_category(),
      // updatedVechileKeys: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
 get_vech_category = () => {
    const vehicles =
      this.props.VehicleData &&
      this.props.VehicleData.find(
        item => item.CAPID.value === Number(this.props.match.params.id)
      );
    const vech_category =
      vehicles &&
      Object.keys(vehicles).reduce((arr, vehicle) => {
        if (
            vehicles[vehicle].varCategory &&!arr.find(item => item.value === vehicles[vehicle].varCategory)
        )
          return arr.concat({
            value: vehicles[vehicle].varCategory,
            label: vehicles[vehicle].varCategory
          });
        else if (
          vehicles[vehicle].varCategory &&
          !arr.find(item => item.label === "Other")
        )
          return arr.concat({ value: null, label: "Other" });
        return arr;
      }, []);
    return vech_category;
  };

  handleChange(e, key) {
    const vehicles = { ...this.state.vehicles };
    vehicles[key].value = e.target.value;
    this.setState({ vehicles });
  }

  handleCancel() {
    this.props.history.push(URLS.VehicleManagement);
  }

  handleChangeSelect(value) {
    this.setState({ selectedOption: value });
  }

  handleUpdate() {
    const { vehicles } = this.state;
    const dataObj = Object.keys(vehicles).reduce((obj, vehicleKey) => {
      return { ...obj, [vehicleKey]: vehicles[vehicleKey].value };
    }, {});
    this.props.updateVehicleData({ ...dataObj });
  }

  cancelEditVehicle() {
    this.props.history.push(URLS.VehicleManagement);
  }

  render() {
    const { vech_category, selectedOption, vehicles } = this.state;
    const {VehicleData} = this.props;
    return (
      <div className="edit-user-container">
        <div className="selectCategory">
          <h2>Select Category</h2>
        <Select
          style={{
            position: "fixed"
          }}
          value={selectedOption}
          onChange={this.handleChangeSelect}
          options={vech_category}
        />
        </div>
        <div className="field-wrapper">
          {
            vehicles &&
            selectedOption &&
            Object.keys(vehicles).map(vehicleKey => {
              const vehicle_val = vehicles[vehicleKey].value;
              if (vehicles[vehicleKey].varCategory === selectedOption.value) {
                return (
                    <div className="divSpace">
                      <label>{vehicles[vehicleKey].label}:</label>
                      <input
                        disabled={(vehicleKey === "CAPID" || vehicleKey === "images" || vehicleKey === "carverterCategory" || vehicleKey === "secondaryTag") && this.state.disabled}
                        type="text"
                        className="form-control"
                        value = { typeof(vehicle_val) != "object" ? vehicle_val : (vehicle_val && vehicle_val.name || null) }
                        onChange={e => this.handleChange(e, vehicleKey)}
                      />
                  </div>
                );
              }
            })}
        </div>
        <span className="buttonContainer">
          <button
            className="btn btn-primary customButton"
            onClick={this.handleUpdate}
          >
            Update
          </button>
          &nbsp;&nbsp;
          <button
            className="btn btn-primary customButton"
            onClick={this.handleCancel}
          >
            Cancel
          </button>
        </span>
      </div>
    );
  }
}



const mapStateToProps = ({vehicleManagementReducer}) => {
  return {
     VehicleData : vehicleManagementReducer.VehicleData
  }
}

const mapDispatchToProps = dispatch => ({
  getVehicleData: bindActionCreators(getVehicleData, dispatch),
  updateVehicleData: bindActionCreators(updateVehicleData, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditVehicleData);
