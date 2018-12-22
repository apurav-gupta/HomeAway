import { SET_USER, SET_USER_LOGOUT } from "../actions/types";
import isEmpty from "../components/Validations/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case SET_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: action.payload
      };

    default:
      return state;
  }
}
