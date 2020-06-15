import { saveState } from "../../../utils/common";

const initialState = {
  errorData: {},
  user: {
    token: ""
  },
  status: true,
  message: "",
  data: ""
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      state = {
        ...state,
        errorData: initialState.errorData,
        user: { token: action.payload.data },
        status: action.payload.status,
        message: action.payload.messages
      };
      saveState("token", action.payload.data);
      break;
    case "API_FAILURE_LOGIN":
      state = {
        ...state,
        errorData: action.payload.data,
        user: initialState.user,
        status: action.payload.status,
        message: action.payload.messages,
        data: action.payload.data
      };
      break;
    case "LOAD_USER":
      state = { ...state, user: { ...state.user, token: action.payload } };
      break;
    case "PASSWORD_CHANGE":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.message
      };
      break;
    case "LOGOUT":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        user: { token: "" }
      };
      break;
  }
  return state;
};

export default loginReducer;
