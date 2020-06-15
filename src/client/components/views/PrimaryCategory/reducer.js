const initialState = {
  status: true,
  message: "",
  tags: [],
  tagId: ""
};

const PrimaryCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add_PRIMARY_CATEGORY_SUCCESS":
      state = { ...state, status: action.payload.status , message : action.payload.message};
      break;
    case "PRIMARY_API_FAILURE":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "GET_PRIMARY_SUCCESS":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages,
        tags: action.payload.data
      };
      break;
    case "DELETE_PRIMARY_SUCCESS":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "UPDATE_PRIMARY_SUCCESSFULLY":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
  }

  return state;
};

export default PrimaryCategoryReducer;
