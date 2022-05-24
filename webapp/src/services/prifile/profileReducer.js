import {
  SET_ALL_TRUE,
  SET_BEST_SOLUTIONS_TASKS,
  SET_ERROR, SET_INFO,
  SET_IS_BEST_SOLUTIONS_TASKS_LOADING,
  SET_IS_INFO_LOADING,
  SET_IS_SOLVED_TASKS_LOADING,
  SET_IS_UNRESOLVED_TASKS_LOADING, SET_SOLVED_TASKS, SET_UNRESOLVED_TASKS,
} from './profileTypes';

const initialState = {
  isInfoLoading: false,
  isSolvedTasksLoading: false,
  isUnresolvedTasksLoading: false,
  isBestSolutionsTasksLoading: false,
  error: "",
  info: null,
  solvedTasks: [],
  unresolvedTasks: [],
  bestSolutionsTasks: [],
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_INFO_LOADING:
      return {
        ...state,
        isInfoLoading: action.payload,
      };
    case SET_IS_SOLVED_TASKS_LOADING:
      return {
        ...state,
        isSolvedTasksLoading: action.payload,
      };
    case SET_IS_UNRESOLVED_TASKS_LOADING:
      return {
        ...state,
        isUnresolvedTasksLoading: action.payload,
      };
    case SET_IS_BEST_SOLUTIONS_TASKS_LOADING:
      return {
        ...state,
        isBestSolutionsTasksLoading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_INFO:
      return {
        ...state,
        info: action.payload,
        isInfoLoading: true,
      };
    case SET_SOLVED_TASKS:
      return {
        ...state,
        solvedTasks: action.payload,
        isSolvedTasksLoading: true,
      };
    case SET_UNRESOLVED_TASKS:
      return {
        ...state,
        unresolvedTasks: action.payload,
        isUnresolvedTasksLoading: true,
      };
    case SET_BEST_SOLUTIONS_TASKS:
      return {
        ...state,
        bestSolutionsTasks: action.payload,
        isBestSolutionsTasksLoading: true,
      };
    case SET_ALL_TRUE:
      return {
        ...state,
        isInfoLoading: true,
        isSolvedTasksLoading: true,
        isUnresolvedTasksLoading: true,
        isBestSolutionsTasksLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;