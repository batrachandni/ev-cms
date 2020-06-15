const initalState = {
  initialData: []
};

const websiteReducer = (state = initalState, action) => {
  switch (action.type) {
    case "GET_INTIAL_DATA":
      state = { ...state, initalData: action.payload };
      break;
    case "CHANGE_LOADER_STATUS":
      state = { ...state, isLoaderVisible: action.payload };
      break;
  }

  return state;
};

export default websiteReducer;
