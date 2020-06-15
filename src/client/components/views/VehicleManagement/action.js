import REQUEST from "../../../utils/http.service";
import { saveAs } from 'file-saver';

export const getVehicleData = (data) => async dispatch => {
  const res = await REQUEST({
    method: "GET",
    url: `/carData/${data.skip}/${data.limit}`,
    auth: true,
  });
  if (res.data.status) {
    dispatch({
      type: "GET_VEHICLE_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};

export const assignTagList = () => async dispatch => {
  const res = await REQUEST({
    method: "GET",
    url: "/assignTagList",
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "GET_TAG_LIST_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};

export const updateAssignTag = formData => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/assignPrimaryCategory",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "Update_Assign_Tag",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};
export const updateAssignTagSec = formData => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/assignSecondaryTag",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "Update_Assign_Tag",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};
export const updateAssignTagTer = formData => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/assignTertiaryTag",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "Update_Assign_Tag",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};

export const uploadFile = data => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/uploadArvalFile",
    data: data,
    auth: true
  });
  if (res.status) {
    dispatch({
      type: "UPLOAD_FILE",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};

export const updateVehicleData = data => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/updateVehicleData",
    data: data,
    auth: true
  });
  if (res.status) {
    dispatch({
      type: "UPDATED_VEHICLE_DATA",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};
export const UpdateCapById = data => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/updateCapDataById",
    data: data,
    auth: true
  });
  if (res.status) {
    dispatch({
      type: "UPDATED_CAPID_DATA",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};
export const getCountAffectedFields = capId => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/primaryTagCount",
    data: capId,
    auth: true
  });
  if (res.status) {
    dispatch({
      type: "UPDATED_COUNT_DATA",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};



export const getCountOfData = () => async dispatch => {
  const res = await REQUEST({
    method: "GET",
    url: "/carDataCount",
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "GET_COUNT_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};

export const deleteVehicleData = id => async dispatch => {
  const res = await REQUEST({
    method: "DELETE",
    url: `/vehicle/${id}`,
    data: {id},
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "DELETED-SUCCESS_VEHICLE",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};

export const downloadArvalsheet = () => async dispatch => {
  const res = await REQUEST({
    method: "GET",
    url: "/cms/exportData",
    auth: true
  });
 if (res.data.status) {
    dispatch({
      type: "DOWNLOAD_SHEET_SUCCESSFULL",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};
export const handleConformData = () => async dispatch => {
  const res = await REQUEST({
    method: "GET",
    url: "/cms​/updateCapDataAll",
    auth: true
  });
 if (res.data.status) {
    dispatch({
      type: "UPDATE_CAP_ALL",
      payload: res.data
    });
  } else {
    dispatch({
      type: "VEHICLE_API_FAILURE",
      payload: res.data
    });
  }
};