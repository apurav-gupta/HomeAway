import { GET_PHOTOS, GET_SINGLE_PHOTOS } from "../actions/types";

const initialState = {
  photos: [],
  photo: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:
      console.log(action.payload);
      return {
        ...state,
        photos: action.payload
      };

    case GET_SINGLE_PHOTOS:
      return {
        ...state,
        photo: action.payload
      };

    default:
      return state;
  }
}
