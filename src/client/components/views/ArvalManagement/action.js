import REQUEST from "../../../utils/http.service";

export const getArvalList = () => async dispatch => {
  const res = await REQUEST({
    method: "GET",
    url: "/fetchArvalLog",
    auth: true
  });
  if (res.data.status) {
    dispatch({
      type: "GET_ARVAL_SUCCESS",
      payload: res.data
    });
  } else {
    dispatch({
      type: "API_FAILURE_ARVAL",
      payload: res.data
    });
  }
};
