import REQUEST from "../../../utils/http.service";

export const addRpiListAction = formData => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/rpi",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "ADD_RPI_LIST_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "RPI_API_FAILURE",
      payload: res.data
    });
  }
};
export const getRpiList = () => async dispatch => {
  const res = await REQUEST({
    method: "GET",
    url: "/rpi",
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "GET_RPI_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "RPI_API_FAILURE",
      payload: res.data
    });
  }
};

export const deleteRpiList = id => async dispatch => {
  const res = await REQUEST({
    method: "DELETE",
    url: `/rpi/${id}`,
    data: { id },
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "DELETED-SUCCESS_RPI",
      payload: res.data
    });
  } else {
    dispatch({
      type: "RPI_API_FAILURE",
      payload: res.data
    });
  }
};

export const updateRpiList = formData => async dispatch => {
  const res = await REQUEST({
    method: "PUT",
    url: "/rpi",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "UPDATE_RPI_SUCCESSFULLY",
      payload: res.data
    });
  } else {
    dispatch({
      type: "RPI_API_FAILURE",
      payload: res.data
    });
  }
};
