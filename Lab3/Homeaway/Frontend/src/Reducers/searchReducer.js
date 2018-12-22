import {
  DISPLAY_SEARCHED_PROPERTIES,
  PROPERTY_ID_DISPLAY,
  GET_PROPERTY_DETAILS_BY_ID
} from "../actions/types";

const initialState = {
  display_property: [],
  property_details: [],
  save_property_id: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_SEARCHED_PROPERTIES:
      return {
        ...state,
        display_property: action.payload
      };

    case PROPERTY_ID_DISPLAY:
      console.log(action.payload);
      return {
        ...state,
        save_property_id: action.payload
      };

    case GET_PROPERTY_DETAILS_BY_ID:
      console.log(action.payload);
      return {
        ...state,
        property_details: action.payload
      };

    default:
      return state;
  }
}
