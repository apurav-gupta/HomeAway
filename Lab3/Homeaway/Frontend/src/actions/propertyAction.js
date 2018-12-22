import axios from "axios";
import {
  GET_ERRORS,
  GET_OWNER_BOOKED_PROPERTY,
  GET_OWNER_DASHBOARD
} from "./types";
const ROOT_URL = "http://localhost:3001";

// List a property
export const listProperty = (propertyData, history) => async dispatch => {
  console.log("Inside property listing");
  console.log(propertyData.ownermail);
  await axios
    .post(`${ROOT_URL}/api/properties/listProperty`, propertyData)
    .then(res => {
      alert("Property Successfully Listed");
    })
    .catch(err =>
      alert("Property is not listed, fill the property details again !!")
    );
};

// Display owner's properties
export const displayProperties = propertyData => async dispatch => {
  console.log("Inside property display");
  console.log(propertyData.ownermail);
  const response = await axios.post(
    `${ROOT_URL}/api/properties/displayProperties`,
    propertyData
  );
  console.log(response.data);
  dispatch({
    type: GET_OWNER_DASHBOARD,
    payload: response.data
  });
};

// Display owner's booked properties
export const ownerBookedProperties = propertyData => async dispatch => {
  console.log("Inside booked property display");
  console.log(propertyData.ownermail);
  const response = await axios.post(
    `${ROOT_URL}/api/properties/bookedProperties`,
    propertyData
  );
  console.log(response.data);
  dispatch({
    type: GET_OWNER_BOOKED_PROPERTY,
    payload: response.data
  });
};
