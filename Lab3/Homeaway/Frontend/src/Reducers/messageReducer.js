import {
  GET_MESSAGE,
  GET_OWNER_MESSAGE,
  GET_OWNER_REPLY,
  GET_CUSTOMER_MESSAGE
} from "../actions/types";

const initialState = {
  traveller_messages: [],
  owner_messages: [],
  owner_reply: [],
  customer_message: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGE:
      console.log(action.payload);
      return {
        ...state,
        traveller_messages: action.payload
      };

    case GET_OWNER_MESSAGE:
      console.log(action.payload);
      return {
        ...state,
        owner_messages: action.payload
      };

    case GET_CUSTOMER_MESSAGE:
      return {
        ...state,
        customer_message: action.payload
      };

    case GET_OWNER_REPLY:
      console.log(action.payload);
      return {
        ...state,
        owner_reply: action.payload
      };

    default:
      return state;
  }
}
