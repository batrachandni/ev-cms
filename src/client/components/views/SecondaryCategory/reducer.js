const initialState = {
  status: true,
  message: "",
  category: [],
};

const SecondaryCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add_SECONDARY_CATEGORY_SUCCESS":
      state = { ...state, status: action.payload.status , message : action.payload.message};
      break;
    case "SECONDARY_API_FAILURE":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "GET_SECONDARY_CATEGORY_SUCCESS":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages,
        category: action.payload.data
      };
      break;
    case "DELETED-SECONDARY_CATEGORY":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "UPDATE_SECONDARY_SUCCESSFULLY":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
  }

  return state;
};

export default SecondaryCategoryReducer;
