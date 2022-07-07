import {
  SET_CHECK_RESULT,
  SET_CHECK_SELECT, SET_ERROR_CHECKING_SELECT,
  SET_ERROR_EXECUTING_SQL, SET_INPUT_VALUE_SQL, SET_IS_CHECKING_SELECT,
  SET_IS_EXECUTING_SQL,
  SET_SQL_ITEMS,

} from './queryTypes';

const initialState = {
  inputValue:"",
  isExecutingSql:true,
  errorExecutingSql:"",
  sqlItems:[],
  CheckSelectResult: null,
  isCheckingSelect:true,
  errorCheckingSelect:""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INPUT_VALUE_SQL:
      return {
        ...state,
        inputValue: action.payload,
      };
    case SET_SQL_ITEMS:
      return {
        ...state,
        sqlItems: action.payload,
        isExecutingSql: true,
      };
    case SET_IS_EXECUTING_SQL:
      return {
        ...state,
        isExecutingSql: action.payload,
      };
    case SET_ERROR_EXECUTING_SQL:
      return {
        ...state,
        errorExecutingSql: action.payload,
        isExecutingSql: true,
      };
    case SET_CHECK_SELECT:
      return {
        ...state,
        CheckSelectResult: action.payload,
        isCheckingSelect: true,
      };
    case SET_IS_CHECKING_SELECT:
      return {
        ...state,
        isCheckingSelect: action.payload,
      };
    case SET_ERROR_CHECKING_SELECT:
      return {
        ...state,
        errorCheckingSelect: action.payload,
        isCheckingSelect: true,
      };
    case SET_CHECK_RESULT:
      return {
        ...state,
        CheckSelectResult: action.payload
      }
    default:
      return state;
  }
};

export default reducer;