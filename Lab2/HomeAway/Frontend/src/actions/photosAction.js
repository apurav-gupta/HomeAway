import axios from "axios";
import { GET_ERRORS, GET_PHOTOS, GET_SINGLE_PHOTOS } from "./types";
const ROOT_URL = "http://localhost:3001";

//get photo of image name

export const getPhoto = imgName => dispatch => {
  axios
    .post(`${ROOT_URL}/api/photos/download/` + imgName)
    .then(res => {
      dispatch({
        type: GET_SINGLE_PHOTOS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const postPhotos = data => dispatch => {
  console.log(" in post photos fucntion");
  console.log(data);

  axios.post(`${ROOT_URL}/api/photos/uploadPhotos`, data).then(res => {
    dispatch({
      type: GET_PHOTOS,
      payload: res.data
    });
  });
};
