import {
  GET_OWNER_DASHBOARD,
  GET_OWNER_BOOKED_PROPERTY
} from "../actions/types";

const initialState = {
  owner_data: [],
  owner_display_data: [],
  photos: [],
  photo: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_OWNER_DASHBOARD:
      return {
        ...state,
        owner_data: action.payload
      };

    case GET_OWNER_BOOKED_PROPERTY:
      return {
        ...state,
        owner_display_data: action.payload
      };
    default:
      return state;
  }
}
