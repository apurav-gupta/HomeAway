import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_USER } from "./types";

export const signupCustomer = (registerData, history) => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .post("http://localhost:3001/api/customers/CustomerSignup", registerData)
    .then(response => {
      const val = response.data;
      dispatch(setCustomer(val));
      if (response.status === 200) {
        history.push("/CustomerLogin");
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/// OWNER SIGN UP

export const signUpOwner = (registerData, history) => dispatch => {
  axios
    .post("http://localhost:3001/api/customers/OwnerSignup", registerData)
    .then(response => {
      const val = response.data;
      dispatch(setCustomer(val));
      if (response.status === 200) {
        history.push("/OwnerLogin");
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Customer Login

export const loginCustomer = (loginData, history) => dispatch => {
  console.log(loginData.username);
  axios
    .post("http://localhost:3001/api/customers/CustomerLogin", loginData)
    .then(response => {
      //Save to localstorage
      const { token } = response.data;

      // Set token to localstorage
      localStorage.setItem("JWTToken", token);

      //Set Token to Authorization Header
      setAuthToken(token);

      // Decode Token to get user data
      const decoded = jwt_decode(token);

      dispatch(setCustomer(decoded));

      if (response.status === 200) {
        history.push("/Home");
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Owner Login

export const loginOwner = (loginData, history) => dispatch => {
  axios
    .post("http://localhost:3001/api/customers/OwnerLogin", loginData)
    .then(response => {
      const val = response.data;
      dispatch(setCustomer(val));
      if (response.status === 200) {
        sessionStorage.setItem("ownmail", loginData.username);
        history.push("/Dashboard");
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set Logged in User
export const setCustomer = decoded => {
  return {
    type: SET_USER,
    payload: decoded
  };
};

//Set Logged Out User
export const logoutCustomer = () => dispatch => {
  // Remove token from LocalStorage
  localStorage.removeItem("JWTToken");
  //Remove auth Header from future requests
  setAuthToken(false);
  // Set current user to {} which will ser isAuthenticated to false
  dispatch(setCustomer({}));
};
