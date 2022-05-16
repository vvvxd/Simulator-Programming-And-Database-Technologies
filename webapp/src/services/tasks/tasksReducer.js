import {SET_TASKS, SET_TASKS_ERROR, SET_TASKS_LOADED} from './tasksTypes';

const initialState = {
  items: [],
  isLoaded: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        items: [...action.payload],
        isLoaded: true,
      };
    case SET_TASKS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case SET_TASKS_ERROR:
      return {
        ...state,
        isLoaded: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;