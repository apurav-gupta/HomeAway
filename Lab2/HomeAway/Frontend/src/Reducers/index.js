import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import profileReducer from "./profileReducer";
import searchReducer from "./searchReducer";
import propertyReducer from "./propertyReducer";
import photoReducer from "./photoReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  messages: messageReducer,
  photos: photoReducer,
  profile: profileReducer,
  property: propertyReducer,
  home: searchReducer,
  auth: AuthReducer
});
