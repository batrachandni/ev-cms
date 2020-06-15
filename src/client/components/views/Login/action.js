import REQUEST from "../../../utils/http.service";

export const loginUserAction = formData => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/cmsLogin",
    data: formData
  });
  if (res.data.status) {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "API_FAILURE_LOGIN",
      payload: res.data
    });
  }
};

export const loadUser = token => {
  return {
    type: "LOAD_USER",
    payload: token
  };
};
export const changePasswordAction = formData => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/changePassword",
    data: formData,
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "PASSWORD_CHANGE",
      payload: res.data
    });
  } else {
    dispatch({
      type: "API_FAILURE_LOGIN",
      payload: res.data
    });
  }
};
export const logOutAction = () => async dispatch => {
  const res = await REQUEST({
    method: "POST",
    url: "/cmsLogout",
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "LOGOUT",
      payload: res.data
    });
  } else {
    dispatch({
      type: "API_FAILURE_LOGIN",
      payload: res.data
    });
  }
};
