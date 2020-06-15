import REQUEST from "../../../utils/http.service";

export const getAllPagesId = () => async dispatch => {
    const res = await REQUEST({
      method: "GET",
      url: "/pages",
      auth: true
    });
    if (res.data.status) {
      dispatch({
        type: "GET_PAGES_ID",
        payload: res.data
      });
    } else {
      dispatch({
        type: "PAGES_FAILURE",
        payload: res.data
      });
    }
  };

  export const getPageDataById = (pageId) => async dispatch => {
    const res = await REQUEST({
      method: "GET",
      url: `/pages/${pageId}`,
      auth: true
    });
    if (res.data.status) {
      dispatch({
        type: "GET_PAGE_DATA",
        payload: res.data
      });
    }  else {
      dispatch({
        type: "PAGES_FAILURE",
        payload: res.data
      });
    }
  };


  export const sendHtmlData = (pageId, data ) => async dispatch => {
    const res = await REQUEST({
      method: "POST",
      url: `/cms/pages/${pageId}`,
      data: data,
      auth: true
    });
    if (res.status) {
      dispatch({
        type: "UPDATED_HTML_DATA",
        payload: res.data
      });
    } else {
      dispatch({
        type: "PAGES_FAILURE",
        payload: res.data
      });
    }
  };

  export const sendImageFile = (data) => async dispatch => {
    const res = await REQUEST({
      method: "POST",
      url: "/cms/uploadImage",
      data: data,
      auth: true
    });
    if (res.status) {
      dispatch({
        type: "GET_FILE_URL",
        payload: res.data
      });
    } else {
      dispatch({
        type: "PAGES_FAILURE",
        payload: res.data
      });
    }
  };

  export const sendImageFileInEditor = (data) => async dispatch => {
    const res = await REQUEST({
      method: "POST",
      url: "/cms/uploadImage",
      data: data,
      auth: true
    });
    if (res.status) {
      dispatch({
        type: "GET_FILE_URL_FOREDITOR",
        payload: res.data
      });
    } else {
      dispatch({
        type: "PAGES_FAILURE",
        payload: res.data
      });
    }
  };