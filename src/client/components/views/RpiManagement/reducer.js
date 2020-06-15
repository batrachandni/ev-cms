const initialState = {
  status: true,
  message: "",
  RpiList: []
};

const RpiManagmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RPI_LIST_SUCCESS":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.status,
        RpiList: action.payload.RpiList
      };
      break;
    case "RPI_API_FAILURE":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "GET_RPI_SUCCESS":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages,
        RpiList: action.payload.data
      };
      break;
    case "DELETED-SUCCESS_RPI":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "UPDATE_RPI_SUCCESSFULLY":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
  }

  return state;
};

export default RpiManagmentReducer;
