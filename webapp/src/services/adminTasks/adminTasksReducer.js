import {
  SET_ALL_TASKS,
  SET_ERROR_ALL_TASKS,
  SET_IS_LOADING_ALL_TASKS
} from './adminTasksTypes';

const initialState = {
  isLoading: false,
  error:false,
  tasks: [],
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING_ALL_TASKS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ERROR_ALL_TASKS:
      return {
        ...state,
        error: action.payload,
        isLoading: true,
      };
    case SET_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;