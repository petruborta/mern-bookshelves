import axios from "axios";
import {
  GET_ERRORS
} from "./types";

export const addBook = bookData => dispatch => {
  axios
    .post("/books/add-book", bookData)
    .then(res => alert(res.data.book))
    .catch(err => {
      alert(err.response.data.book);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};