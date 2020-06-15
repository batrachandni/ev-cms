const initialState = {
  status: true,
  message: "",
  ArvalList: []
};

const ArvalManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case "API_FAILURE_ARVAL":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "GET_ARVAL_SUCCESS":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages,
        ArvalList: action.payload.data
      };
      break;
  }

  return state;
};

export default ArvalManagementReducer;
