import REQUEST from "../../../utils/http.service";

export const addTertiaryAction = formData => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/tertiaryTag",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "Add_TERTIARY_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "TERTIARY_API_FAILURE",
      payload: res.data
    });
  }
};
export const getTertiaryTag = () => async dispatch => {
  const res = await REQUEST({
    method: "GET",
    url: "/tertiaryTag",
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "GET_TERTIARY_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "TERTIARY_API_FAILURE",
      payload: res.data
    });
  }
};

export const deleteTertiaryTag = id => async dispatch => {
  const res = await REQUEST({
    method: "DELETE",
    url: `/tertiaryTag/${id}`,
    data: { id },
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "DELETED-SUCCESS_TERTIARY",
      payload: res.data
    });
  } else {
    dispatch({
      type: "TERTIARY_API_FAILURE",
      payload: res.data
    });
  }
};

export const updateTertiaryTag = formData => async dispatch => {
  const res = await REQUEST({
    method: "PUT",
    url: "/tertiaryTag",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "UPDATE_SUCCESSFULLY_TERTIARY",
      payload: res.data
    });
  } else {
    dispatch({
      type: "TERTIARY_API_FAILURE",
      payload: res.data
    });
  }
};
