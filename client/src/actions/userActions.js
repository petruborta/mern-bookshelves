import axios from "axios";
import Alert from "../components/layout/Alert";
import {
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
      const { status, data } = err.response;
      Alert.show({ [status]: data });
    });
};

export const fetchAdminUsers = exceptedID => dispatch => {
  axios
    .get("/users/admin", { params: { exceptedID } })
    .then(res => dispatch({
        type: SET_ADMIN_USERS,
        payload: res.data
      })
    )
    .catch(err => {
      const { status, data } = err.response;
      Alert.show({ [status]: data });
    });
};

export const makeAdmin = userID => dispatch => {
  axios
    .post("/users/make-admin", { userID })
    .then(res => {
      dispatch({
        type: MAKE_ADMIN,
        payload: userID
      });

      const { status, data } = res;
      Alert.show({ [status]: data });
    })
    .catch(err => {
      const { status, data } = err.response;
      Alert.show({ [status]: data });
    });
};

export const removeAdmin = userID => dispatch => {
  axios
    .post("/users/remove-admin", { userID })
    .then(res => {
      dispatch({
        type: REMOVE_ADMIN,
        payload: userID
      });

      const { status, data } = res;
      Alert.show({ [status]: data });
    })
    .catch(err => {
      const { status, data } = err.response;
      Alert.show({ [status]: data });
    });
};
