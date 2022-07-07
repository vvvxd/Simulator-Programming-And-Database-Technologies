import {
  SET_ACTIVE_TASK_ID, SET_CHECK_PAGE, SET_ERROR_EXECUTING_SQL,
  SET_INPUT_VALUE_SQL, SET_IS_EXECUTING_SQL,
  SET_SQL_ITEMS,
  SET_TASK,
  SET_TASK_ERROR,
  SET_TASK_LOADED
} from './taskTypes';

const initialState = {
  item: null,
  isLoaded: false,
  error: false,
  activeTaskId:null,
  CheckSelectResult: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK:
      return {
        ...state,
        item: action.payload,
        isLoaded: true,
        CheckSelectResult:  !(action.payload.status === null || action.payload.status ===0)
      };
    case SET_TASK_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case SET_TASK_ERROR:
      return {
        ...state,
        isLoaded: false,
        error: action.payload,
      };
    case SET_ACTIVE_TASK_ID:
      return {
        ...state,
        activeTaskId: action.payload,
      };
    case SET_CHECK_PAGE:
      return {
        ...state,
        CheckSelectResult: action.payload
      }
    default:
      return state;
  }
};

export default reducer;