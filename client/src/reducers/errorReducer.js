import { GET_ERRORS, SET_ERRORS } from "../actions/types";

const initialState = {};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case SET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
