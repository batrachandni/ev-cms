import CONFIG from "./config";
import axios from "axios";
import { changeloaderstatus } from "../layout/Website/Website.action";
import store from "../store";

const REQUEST = config => {
  store.dispatch(changeloaderstatus(true));
  let {
    loginReducer: {
      user: { token }
    }
  } = store.getState();
  const HTTP = axios.create({
    baseURL: CONFIG.API.url
  });

  HTTP.interceptors.request.use(request => {
    if (config.auth) {
      request.headers = { "x-auth-token": token };
    }
    request.url = request.baseURL + config.url;
    request.data = config.data;
    request.method = config.method;
    return request;
  });

  HTTP.interceptors.response.use(
    response => {
      store.dispatch(changeloaderstatus(false));
      if (response.status == 200) {
        return response;
      }
    },
    error => {
      //Force logout DO NOT REMOVE
      store.dispatch(changeloaderstatus(false));
      if (error.response.status === 420) {
        console.error("error");
      }
      if (
        error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 404 ||
        error.response.status == 400 ||
        error.response.status == 500
      ) {
        return error.response;
      }
    }
  );
  return HTTP();
};

export default REQUEST;
