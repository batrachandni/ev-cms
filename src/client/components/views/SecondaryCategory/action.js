import REQUEST from "../../../utils/http.service";

export const addCategoryAction = formData => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/secondaryCategory",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "Add_SECONDARY_CATEGORY_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "SECONDARY_API_FAILURE",
      payload: res.data
    });
  }
};
export const getCategory = () => async dispatch => {
  const res = await REQUEST({
    method: "GET",
    url: "/secondaryCategory",
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "GET_SECONDARY_CATEGORY_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "SECONDARY_API_FAILURE",
      payload: res.data
    });
  }
};

export const deleteCategory = data => async dispatch => {
  const res = await REQUEST({
    method: "DELETE",
    url: "/secondaryCategory",
    data: data,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "DELETED-SECONDARY_CATEGORY",
      payload: res.data
    });
  } else {
    dispatch({
      type: "SECONDARY_API_FAILURE",
      payload: res.data
    });
  }
};

export const updateCategory = formData => async dispatch => {
  const res = await REQUEST({
    method: "PUT",
    url: "/secondaryCategory",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "UPDATE_SECONDARY_SUCCESSFULLY",
      payload: res.data
    });
  } else {
    dispatch({
      type: "SECONDARY_API_FAILURE",
      payload: res.data
    });
  }
};

// export const getSecondaryCategory = () => async dispatch => {
//   const res = await REQUEST({
//     method: "POST",
//     url: "/primaryCategory",
//     auth: true
//   });
//   if (res.data.status) {
//     dispatch({
//       type: "GET_SECONDARY_CATEGORY_SUCCESS",
//       payload: res.data
//     });
//   } else {
//     dispatch({
//       type: "SECONDARY_API_FAILURE",
//       payload: res.data
//     });
//   }
// };