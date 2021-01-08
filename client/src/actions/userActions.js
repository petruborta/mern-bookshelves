import axios from "axios";
import {
  GET_ERRORS,
  SET_REGULAR_USERS,
  SET_ADMIN_USERS,
  MAKE_ADMIN,
  REMOVE_ADMIN
} from "./types";

export const fetchRegularUsers = () => dispatch => {
  axios
    .get("/users/regular")
    .then(res => dispatch({
        type: SET_REGULAR_USERS,
        payload: res.data
      })
    )
    .catch(err => {
      alert(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const fetchAdminUsers = () => dispatch => {
  axios
    .get("/users/admin")
    .then(res => dispatch({
        type: SET_ADMIN_USERS,
        payload: res.data
      })
    )
    .catch(err => {
      alert(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const makeAdmin = userID => dispatch => {
  axios
    .post("/users/make-admin", { userID })
    .then(res => {
      alert(res.data.message);
      dispatch({
        type: MAKE_ADMIN,
        payload: userID
      })
    })
    .catch(err => {
      alert(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const removeAdmin = userID => dispatch => {
  axios
    .post("/users/remove-admin", { userID })
    .then(res => {
      alert(res.data.message);
      dispatch({
        type: REMOVE_ADMIN,
        payload: userID
      })
    })
    .catch(err => {
      alert(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};