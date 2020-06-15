import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import loginReducer from "../../client/components/views/Login/reducer";
import PrimaryCategoryReducer from "../../client/components/views/PrimaryCategory/reducer";
import SecondaryCategoryReducer from "../../client/components/views/SecondaryCategory/reducer";
import vehicleManagementReducer from "../../client/components/views/VehicleManagement/reducer";
import RpiManagmentReducer from "../../client/components/views/RpiManagement/reducer";
import ArvalManagementReducer from "../../client/components/views/ArvalManagement/reducer";
import tertiaryCategoryReducer from "../../client/components/views/TertiaryCategory/reducer";
import  AllContentPageReducer from "../../client/components/views/TheElectricRevolution/reducer";

export default () => {
  const store = createStore(
    combineReducers({
      loginReducer,
      PrimaryCategoryReducer,
      SecondaryCategoryReducer,
      vehicleManagementReducer,
      RpiManagmentReducer,
      ArvalManagementReducer,
      tertiaryCategoryReducer,
      AllContentPageReducer,
      /* somemorereducers */
    }),
    {},
    applyMiddleware(thunk)
  );
  return store;
};
