const initialState = {
  status: true,
  message: "",
  tertiaryList: []
};

const tertiaryCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add_TERTIARY_SUCCESS":
      state = { ...state, status: action.payload.status, message : action.payload.message  };
      break;
    case "TERTIARY_API_FAILURE":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "GET_TERTIARY_SUCCESS":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages,
        tertiaryList: action.payload.data
      };
      break;
    case "DELETED-SUCCESS_TERTIARY":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "UPDATE_SUCCESSFULLY_TERTIARY":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
  }

  return state;
};

export default tertiaryCategoryReducer;
