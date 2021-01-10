import axios from "axios";
import {
  GET_ERRORS,
  SET_BOOKS_ATLAS,
  DELETE_BOOK,
  DELETE_FAVORITE_BOOK,
  SET_USER_BOOKS
} from "./types";

export const fetchBooksAtlas = () => dispatch => {
  axios
    .get("/books/")
    .then(res => {
      dispatch({
        type: SET_BOOKS_ATLAS,
        payload: res.data
      });
    })
    .catch(err => {
      alert(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addBook = bookData => dispatch => {
  axios
    .post("/books/add-book", bookData)
    .then(res => alert(res.data.message))
    .catch(err => {
      alert(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteBook = apiID => dispatch => {
  const confirm = window.confirm("Remove this book from database?");
  
  if (!confirm) return;
  
  axios
    .delete("/books/delete-book", { data: { apiID } })
    .then(res => {
      alert(res.data.message);
      dispatch({
        type: DELETE_BOOK,
        payload: apiID
      });
    })
    .catch(err => {
      alert(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addFavoriteBook = (apiID, userID) => dispatch => {
  axios
    .post("/books/add-favorite-book", { apiID, userID })
    .then(res => alert(res.data.message))
    .catch(err => {
      alert(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const fetchFavoriteBooks = userID => dispatch => {
  axios
    .get("/books/fetch-favorite-books", { params: { userID } })
    .then(res => dispatch({
        type: SET_USER_BOOKS,
        payload: res.data
    }))
    .catch(err => {
      alert(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteFavoriteBook = (apiID, userID) => dispatch => {
  const confirm = window.confirm("Remove this book from favorites?");
  if (!confirm) {
    return;
  }

  axios
    .delete("/books/delete-favorite-book", { data: { apiID, userID } })
    .then(res => {
      alert(res.data.message);
      dispatch({
        type: DELETE_FAVORITE_BOOK,
        payload: apiID
      });
    })
    .catch(err => {
      alert(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const extractPropsBookAPI = (data) => {
  const {
    id: apiID,
    selfLink,
    volumeInfo
  } = data;

  const {
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
    description,
    industryIdentifiers,
    pageCount,
    categories,
    imageLinks,
    language,
    infoLink
  } = volumeInfo;

  const authorsString = authors
    ? authors.join(", ")
    : "";
  
  const identifiers = industryIdentifiers
    ? {
      [industryIdentifiers[0].type]: industryIdentifiers[0].identifier,
      [industryIdentifiers[1] && industryIdentifiers[1].type]: industryIdentifiers[1] && industryIdentifiers[1].identifier
    } : {
      ISBN_13: "",
      ISBN_10: ""
    };
  
  const bookCategories = categories
    ? categories[0] 
    : "";
  
  return {
    apiID,
    selfLink,
    volumeInfo: {
      title,
      subtitle,
      authors: authorsString,
      publisher,
      publishedDate,
      description,
      industryIdentifiers: identifiers,
      pageCount,
      categories: bookCategories,
      imageLinks,
      language,
      infoLink
    }
  };
};