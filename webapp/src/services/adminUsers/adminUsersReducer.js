import {
  SET_ALL_USERS,
  SET_ERROR,
  SET_IS_LOADING
} from './adminUsersTypes';

const initialState = {
  isLoading: false,
  error:false,
  users: [],
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: true,
      };
    case SET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;