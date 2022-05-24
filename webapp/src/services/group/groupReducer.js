import {
  SET_ALL_GROUP,
  SET_ERROR_ALL_GROUP,
  SET_IS_LOADING_ALL_GROUP,
  
} from './groupTypes';

const initialState = {
  isLoadingAllGroup: false,
  error:false,
  groups: [],
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING_ALL_GROUP:
      return {
        ...state,
        isLoadingAllGroup: action.payload,
      };
    case SET_ERROR_ALL_GROUP:
      return {
        ...state,
        error: action.payload,
        isLoadingAllGroup: true,
      };
    case SET_ALL_GROUP:
      return {
        ...state,
        groups: action.payload,
        isLoadingAllGroup: true,
      };
    default:
      return state;
  }
};

export default reducer;