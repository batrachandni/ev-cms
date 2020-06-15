const initialState = {
  status: true,
  message: "",
  VehicleData: [],
  VehicleId: "",
  tagList: [],
  count : "",
  countedtotaldata : '',
  uploadfilestatus : '',
  sheetdata : '',
  statusdownload : '',
  messageFileUpload : '',
  statusUpdateCapData : '',
  statusAllCap : '',
};

const vehicleManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add_CATEGORY_SUCCESS":
      state = { ...state, someData: action.payload };
      break;
    case "VEHICLE_API_FAILURE":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "GET_TAG_LIST_SUCCESS":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages,
        tagList: action.payload.data
      };
      break;
    case "UPDATED_CAPID_DATA":
      state = {
        ...state,
        statusUpdateCapData: action.payload.status,
        message: action.payload.messages
      };

      break;
    case "GET_VEHICLE_SUCCESS":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages,
        VehicleData: action.payload.data
      };
      break;
    case "DELETE_SUCCESS":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "UPDATE_SUCCESSFULLY":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "UPLOAD_FILE":
      state = {
        ...state,
        uploadfilestatus: action.payload.status,
        messageFileUpload: action.payload.messages
      };
      break;
    case "UPDATED_VEHICLE_DATA":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
    case "DELETED-SUCCESS_VEHICLE":
      state = {
        ...state,
        status: action.payload.status,
        message: action.payload.messages
      };
      break;
      case "UPDATED_COUNT_DATA":
        state = {
          ...state,
          status: action.payload.status,
          message: action.payload.messages,
          count : action.payload.data,
        };  
        break;
        case "GET_COUNT_SUCCESS":
          state = {
            ...state,
            status: action.payload.status,
            message: action.payload.messages,
            countedtotaldata : action.payload.data,
          }; 
          break;
          case "DOWNLOAD_SHEET_SUCCESSFULL":
            state = {
              ...state,
              statusdownload: action.payload.status,
              message: action.payload.messages,
              sheetdata : action.payload.data,
            }; 
            break;
            case "UPDATE_CAP_ALL":
              state = {
                ...state,
                statusAllCap: action.payload.status,
                message: action.payload.messages,
                data : action.payload.data,
              }; 
              break;
  }

  return state;
};

export default vehicleManagementReducer;
