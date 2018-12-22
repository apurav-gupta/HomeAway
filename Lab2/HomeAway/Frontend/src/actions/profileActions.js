import axios from "axios";

import { GET_PROFILE, GET_ERRORS, GET_TRAVELLER_BOOKING } from "./types";
const ROOT_URL = "http://localhost:3001";

// Get current profile
export const getCurrentProfile = data => dispatch => {
  console.log(" in get current profile fucntion");
  console.log(data);

  axios
    .get(`${ROOT_URL}/api/customers/getData`, {
      params: { email: data }
    })
    .then(res =>
      dispatch({
        type: GET_PROFILE,
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

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  console.log("Inside update profile");
  console.log(profileData.email);
  axios
    .post(`${ROOT_URL}/api/customers/Update`, profileData)
    .then(res => history.push("/TravDashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Display traveller's bookings
export const travellerBookings = bookingData => async dispatch => {
  console.log("Inside traveller bookings display");
  console.log(bookingData.travellermail);
  const response = await axios.post(
    `${ROOT_URL}/api/customers/travellerBookings`,
    bookingData
  );
  console.log(response.data);
  dispatch({
    type: GET_TRAVELLER_BOOKING,
    payload: response.data
  });
};
