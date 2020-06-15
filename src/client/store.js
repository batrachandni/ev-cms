import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools as compose } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import loginReducer from "./components/views/Login/reducer";
import PrimaryCategoryReducer from "./components/views/PrimaryCategory/reducer";
import SecondaryCategoryReducer from "./components/views/SecondaryCategory/reducer";
import vehicleManagementReducer from "./components/views/VehicleManagement/reducer";
import RpiManagmentReducer from "./components/views/RpiManagement/reducer";
import websiteReducer from "./layout/Website/Website.reducer";
import ArvalManagementReducer from "./components/views/ArvalManagement/reducer";
import tertiaryCategoryReducer from "./components/views/TertiaryCategory/reducer";
import  AllContentPageReducer from "./components/views/TheElectricRevolution/reducer";

const store = createStore(
  combineReducers({
    loginReducer,
    PrimaryCategoryReducer,
    SecondaryCategoryReducer,
    vehicleManagementReducer,
    websiteReducer,
    RpiManagmentReducer,
    ArvalManagementReducer,
    tertiaryCategoryReducer,
    AllContentPageReducer,
    /* somemorereducer */
  }),
  IS_SERVER ? {} : window.INITIAL_STATE,
  compose(applyMiddleware(thunk))
);

export default store;
