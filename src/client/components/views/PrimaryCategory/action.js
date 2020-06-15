import REQUEST from "../../../utils/http.service";

export const addCategoryAction = formData => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/primaryCategory",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "Add_PRIMARY_CATEGORY_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "PRIMARY_API_FAILURE",
      payload: res.data
    });
  }
};

export const getPrimaryTag = () => async dispatch => {
  const res = await REQUEST({
    method: "GET",
    url: "/primaryCategory",
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "GET_PRIMARY_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "PRIMARY_API_FAILURE",
      payload: res.data
    });
  }
};

export const deleteTag = data => async dispatch => {
  const res = await REQUEST({
    method: "DELETE",
    url: "/primaryCategory",
    data: data,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "DELETE_PRIMARY_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "PRIMARY_API_FAILURE",
      payload: res.data
    });
  }
};

export const updateTag = formData => async dispatch => {
  const res = await REQUEST({
    method: "PUT",
    url: "/primaryCategory",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "UPDATE_PRIMARY_SUCCESSFULLY",
      payload: res.data
    });
  } else {
    dispatch({
      type: "PRIMARY_API_FAILURE",
      payload: res.data
    });
  }
};
