import axios from "axios";
import {
  GET_MESSAGE,
  GET_ERRORS,
  GET_OWNER_MESSAGE,
  GET_OWNER_REPLY,
  GET_CUSTOMER_MESSAGE
} from "./types";

const ROOT_URL = "http://localhost:3001";
/*********** Traveller sending message from the Booking of Porperty ********** */
export const sendMessage = messageData => dispatch => {
  console.log("Inside receiving messages");
  console.log(messageData);
  axios
    .post(`${ROOT_URL}/api/messages/postMessage`, messageData)
    .then(res =>
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

/***********************Traveller Dashboard Messages ********** */

export const receiveCustomerMessage = data => dispatch => {
  console.log("Inside receiving messages");
  console.log(data);
  axios
    .get(`${ROOT_URL}/api/messages/receiveCustomerMessage`, {
      params: { email: data }
    })
    .then(res =>
      dispatch({
        type: GET_CUSTOMER_MESSAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

/***************** Owner Dashboard Messages ************ */

export const sendOwnerMessage = ownerData => dispatch => {
  console.log("Inside sednign back messages");
  console.log(ownerData);
  axios
    .post(`${ROOT_URL}/api/messages/sendOwnerMessage`, ownerData)
    .then(res =>
      dispatch({
        type: GET_OWNER_REPLY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const receiveOwnerMessage = data => dispatch => {
  console.log("Inside receiving messages");
  console.log(data);
  axios
    .get(`${ROOT_URL}/api/messages/receiveOwnerMessage`, {
      params: { email: data }
    })
    .then(res =>
      dispatch({
        type: GET_OWNER_MESSAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
