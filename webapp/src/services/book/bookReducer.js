import * as BT from "./bookTypes";

const initialState = {
  book: "",
  error: "",
  types: [],
  languages: [],
  isLoad:false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_BOOK_REQUEST:
    case BT.FETCH_BOOK_REQUEST:
    case BT.UPDATE_BOOK_REQUEST:
    case BT.DELETE_BOOK_REQUEST:
    case BT.FETCH_LANGUAGES_REQUEST:
    case BT.FETCH_TYPES_REQUEST:
      return {
        ...state,
      };
    case BT.BOOK_SUCCESS:
      return {
        ...state,
        book: action.payload,
        error: "",
      };
    case BT.BOOK_FAILURE:
      return {
        ...state,
        book: "",
        error: action.payload,
      };
    case BT.LANGUAGES_SUCCESS:
      return {
        ...state,
        languages: action.payload,
        error: "",
      };
    case BT.LANGUAGES_FAILURE:
      return {
        ...state,
        languages: "",
        error: action.payload,
      };
    case BT.TYPES_SUCCESS:
      return {
        ...state,
        types: action.payload,
        error: "",
      };
    case BT.TYPES_FAILURE:
      return {
        ...state,
        types: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
