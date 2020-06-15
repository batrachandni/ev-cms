const initialState = {
    status: true,
    message: '',
    pageid: '',
    dataheaderImage : '',
    body : '',
    title : '',
    imageurl : '',
    statusForContentPages : '',
    imageurleditor : '',

  };
  
  const AllContentPageReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_PAGES_ID":
        state = {
          ...state,
          status: action.payload.status,
          message: action.payload.message,
          pagesid: action.payload.data
  };
        break;
      case "PAGES_FAILURE":
        state = {
          ...state,
          status: action.payload.status,
          message: action.payload.messages
        };
        break;
        case "UPDATED_HTML_DATA":
            state = {
              ...state,
              statusForContentPages: action.payload.status,
              message: action.payload.messages
            };
            break;
        case "GET_FILE_URL":
              state = {
                ...state,
                status: action.payload.status,
                message: action.payload.messages,
                imageurl : action.payload.data,
              };
           break;
           case "GET_FILE_URL_FOREDITOR":
            state = {
              ...state,
              status: action.payload.status,
              message: action.payload.messages,
              imageurleditor : action.payload.data,
            };
         break;
      case "GET_PAGE_DATA":
        state = {
          ...state,
          status: action.payload.status,
          message: action.payload.messages,
          headerImage : action.payload.data.headerImage,
          title : action.payload.data.title,
          body : action.payload.data.body,

        };
        break;
    }
  
    return state;
  };
  
  export default AllContentPageReducer;