import {
  SET_CURRENT_USER,
  USER_LOADING,
  SET_USER_BOOKS,
  SET_BOOKS_ATLAS,
  DELETE_BOOK,
  DELETE_FAVORITE_BOOK,
  SET_REGULAR_USERS,
  SET_ADMIN_USERS,
  MAKE_ADMIN,
  REMOVE_ADMIN
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

const getBookCategories = books => {
  const categories = books
    .map(book => book.volumeInfo.categories)
    .filter(category => category !== "");

  return [...new Set(categories)];
};

const filterAtlasBooks = (booksAtlas, bookToBeDeleted) => {
  return booksAtlas.filter(book => book.apiID !== bookToBeDeleted);
};

const filterUserBooks = (books, bookToBeDeleted) => {
  return books.filter(book => book.apiID !== bookToBeDeleted);
};

const demoteAdminUser = ({ regularUsers, adminUsers }, userID) => {
  let newRegularUser;
  adminUsers = adminUsers.filter(admin => {
    if (admin.id === userID) {
      admin.isAdmin = false;
      newRegularUser = admin;
      return false;
    }

    return true;
  });

  regularUsers.push(newRegularUser);

  return { adminUsers, regularUsers };
};

const promoteRegularUser = ({ regularUsers, adminUsers }, userID) => {
  let newAdminUser;
  regularUsers = regularUsers.filter(user => {
    if (user.id === userID) {
      user.isAdmin = true;
      newAdminUser = user;
      return false;
    }
    
    return true;
  });

  adminUsers.push(newAdminUser);

  return { adminUsers, regularUsers };
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_USER_BOOKS:
      return {
        ...state,
        user: {
          ...state.user,
          books: action.payload,
          bookCategories: getBookCategories(action.payload)
        }
      };
    case SET_BOOKS_ATLAS:
      return {
        ...state,
        user: {
          ...state.user,
          booksAtlas: action.payload,
          bookCategories: getBookCategories(action.payload)
        }
      };
    case DELETE_BOOK:
      const filteredAtlasBooks = filterAtlasBooks(state.user.booksAtlas, action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          booksAtlas: filteredAtlasBooks,
          bookCategories: getBookCategories(filteredAtlasBooks)
        }
      };
    case DELETE_FAVORITE_BOOK:
      const filteredUserBooks = filterUserBooks(state.user.books, action.payload);

      return {
        ...state,
        user: {
          ...state.user,
          books: filteredUserBooks,
          bookCategories: getBookCategories(filteredUserBooks)
        }
      };
    case SET_REGULAR_USERS:
      return {
        ...state,
        user: {
          ...state.user,
          usersAtlas: {
            ...state.user.usersAtlas,
            regularUsers: action.payload
          }
        }
      };
    case SET_ADMIN_USERS:
      return {
        ...state,
        user: {
          ...state.user,
          usersAtlas: {
            ...state.user.usersAtlas,
            adminUsers: action.payload
          }
        }
      };
    case MAKE_ADMIN:
      return {
        ...state,
        user: {
          ...state.user,
          usersAtlas: promoteRegularUser(state.user.usersAtlas, action.payload)
        }
      };
    case REMOVE_ADMIN:
      return {
        ...state,
        user: {
          ...state.user,
          usersAtlas: demoteAdminUser(state.user.usersAtlas, action.payload)
        }
      };
    default:
      return state;
  }
}
