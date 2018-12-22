import { GET_PROFILE } from "../actions/types";

const initialState = {
  profile: ""
};

export default function(state = initialState, action) {
  console.log("inside reducer");
  switch (action.type) {
    case GET_PROFILE:
      console.log(action.payload);
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
