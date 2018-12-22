import axios from "axios";

import { GET_PROFILE, GET_ERRORS } from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  console.log(" in get current profile fucntion");

  axios
    .get("http://localhost:3001/api/customers/getData")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: err
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  console.log("Inside update profile");
  console.log(profileData.email);
  axios
    .post("http://localhost:3001/api/customers/Update", profileData)
    .then(res => history.push("/TravDashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
