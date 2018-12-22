import axios from "axios";
import {
  GET_PROPERTY_DETAILS_BY_ID,
  DISPLAY_SEARCHED_PROPERTIES,
  PROPERTY_ID_DISPLAY
} from "./types";

const ROOT_URL = "http://localhost:3001";

export const searchProperty = searchData => async dispatch => {
  console.log("Inside display property after search");
  console.log(searchData.location);
  const response = await axios.post(
    `${ROOT_URL}/api/properties/searchProperties`,
    searchData
  );
  console.log(response.data);
  dispatch({
    type: DISPLAY_SEARCHED_PROPERTIES,
    payload: response.data
  });
};

export const displayPropCard = propertyCardData => async dispatch => {
  console.log("Inside properties details after search");
  console.log(propertyCardData.loc);
  const response = await axios.post(
    `${ROOT_URL}/api/properties/propertyCardDisplay`,
    propertyCardData
  );
  console.log(response.data);
  dispatch({
    type: DISPLAY_SEARCHED_PROPERTIES,
    payload: response.data
  });
};

/************* Saving the property id to display the property details ******* */

export const displayPropCardDetail = propDispByID => async dispatch => {
  console.log("Inside property details display page");
  console.log(propDispByID);
  dispatch({
    type: PROPERTY_ID_DISPLAY,
    payload: propDispByID
  });
};

// Get particular property details using property ID
export const propertyDetailsByID = propID => dispatch => {
  console.log(
    " In Property details and getting the property details by property ID "
  );
  console.log(propID);

  axios
    .get(`${ROOT_URL}/api/properties/getPropertyDetailsByID`, {
      params: { propertyID: propID }
    })
    .then(res =>
      dispatch({
        type: GET_PROPERTY_DETAILS_BY_ID,
        payload: res.data
      })
    );
};

/********************* Booking the Property ************ */

export const bookProperty = propertyBooked => async dispatch => {
  console.log("Inside properties details after search");
  console.log(propertyBooked);
  console.log(propertyBooked.property_id);
  const response = await axios.post(
    `${ROOT_URL}/api/properties/propertyBooking`,
    propertyBooked
  );
  console.log(response.data);
};
