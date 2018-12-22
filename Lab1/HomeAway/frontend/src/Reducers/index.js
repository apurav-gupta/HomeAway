import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ErrorReducer from "./ErrorReducer";
import profileReducer from "./profileReducer";
import { reducer as reduxFormReducer } from "redux-form";

export default combineReducers({
  profile: profileReducer,
  auth: AuthReducer,
  form: reduxFormReducer,
  errors: ErrorReducer
});
