import {
  SET_INPUT_VALUE_TEXT, SET_IS_LOADING, SET_ITEMS
  
  
} from './commentTypes';
import {SET_ERROR} from '../stats/statsTypes';

const initialState = {
  inputValue:"",
  isLoading:true,
  error:"",
  items:[],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INPUT_VALUE_TEXT:
      return {
        ...state,
        inputValue: action.payload,
      };
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoading: true,
      };
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
    default:
      return state;
  }
};

export default reducer;