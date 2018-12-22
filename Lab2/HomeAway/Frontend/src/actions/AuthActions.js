import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_USER, SET_USER_LOGOUT } from "./types";

const ROOT_URL = "http://localhost:3001";

export const signupCustomer = (registerData, history) => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .post(`${ROOT_URL}/api/customers/CustomerSignup`, registerData)
    .then(response => {
      const val = response.data;
      console.log(response.status);
      // dispatch(setCustomer(val));
      if (response.status === 202) {
        alert("Traveller Email already exists");
      } else if (response.status === 200) {
        console.log("Signed Up successfully");
        history.push("/CustomerLogin");
      } else if (response.status === 203) {
        console.log(
          "Some error occured, while Signing up, Please Sign Up again"
        );
        alert("Some error occured, while Signing up, Please Sign Up again");
      }
    });
};

/// OWNER SIGN UP

export const signUpOwner = (registerData, history) => dispatch => {
  axios
    .post(`${ROOT_URL}/api/owners/OwnerSignup`, registerData)
    .then(response => {
      const val = response.data;
      console.log(response.status);
      //dispatch(setCustomer(val));
      if (response.status === 202) {
        alert("Owner Email already exists");
      } else if (response.status === 200) {
        console.log("Signed Up successfully");
        history.push("/OwnerLogin");
      } else if (response.status === 203) {
        console.log(
          "Some error occured, while Signing up, Please Sign Up again"
        );
        alert("Some error occured, while Signing up, Please Sign Up again");
      }
    });
};
//Customer Login

export const loginCustomer = (loginData, history) => dispatch => {
  console.log(loginData.username);
  sessionStorage.setItem("travellermail", loginData.username);
  axios
    .post(`${ROOT_URL}/api/customers/CustomerLogin`, loginData)
    .then(response => {
      //Save to sessionStorage
      const { token } = response.data;

      // Set token to sessionStorage
      sessionStorage.setItem("JWTToken", token);

      //Set Token to Authorization Header
      setAuthToken(token);

      // Decode Token to get user data
      const decoded = jwt_decode(token);

      dispatch(setCustomer(decoded));

      if (response.status === 200) {
        history.push("/Home");
      }
    })
    .catch(err => {
      alert(
        "User doesn't exists or Password Wrong, Please try to Login again !!"
      );
    });
};

//Owner Login

export const loginOwner = (loginData, history) => dispatch => {
  console.log(loginData.username);
  sessionStorage.setItem("ownermail", loginData.username);
  axios
    .post(`${ROOT_URL}/api/owners/OwnerLogin`, loginData)
    .then(response => {
      //Save to sessionStorage
      const { token } = response.data;
      console.log(response.data);

      // Set token to sessionStorage
      sessionStorage.setItem("JWTToken", token);

      //Set Token to Authorization Header
      setAuthToken(token);

      // Decode Token to get user data
      const decoded = jwt_decode(token);
      console.log(decoded);

      dispatch(setCustomer(decoded));

      if (response.status === 200) {
        history.push("/Dashboard");
      }
    })
    .catch(err => {
      alert(
        "User doesn't exists or Password Wrong, Please try to Login again !!"
      );
    });
};

//Set Logged in User
export const setCustomer = decoded => {
  return {
    type: SET_USER,
    payload: decoded
  };
};

//Set Logged out User
export const setCustomerOut = decoded => {
  return {
    type: SET_USER_LOGOUT,
    payload: decoded
  };
};

//Set Logged Out User
export const logoutCustomer = () => dispatch => {
  // Remove token from sessionStorage
  sessionStorage.removeItem("JWTToken");
  //Remove auth Header from future requests
  setAuthToken(false);
  // Set current user to {} which will ser isAuthenticated to false
  dispatch(setCustomerOut({}));
};
