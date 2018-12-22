import { GET_PROFILE, GET_TRAVELLER_BOOKING } from "../actions/types";

const initialState = {
  traveller_booking: [],
  profile: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRAVELLER_BOOKING:
      return {
        ...state,
        traveller_booking: action.payload
      };

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
