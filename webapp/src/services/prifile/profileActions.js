import {usersAPI} from '../../api/api';
import {
  SET_ALL_TRUE,
  SET_BEST_SOLUTIONS_TASKS,
  SET_ERROR,
  SET_INFO,
  SET_IS_BEST_SOLUTIONS_TASKS_LOADING,
  SET_IS_INFO_LOADING,
  SET_IS_SOLVED_TASKS_LOADING,
  SET_IS_UNRESOLVED_TASKS_LOADING,
  SET_SOLVED_TASKS,
  SET_UNRESOLVED_TASKS
} from './profileTypes';


export const setIsInfoLoading = (payload) => ({
  type: SET_IS_INFO_LOADING,
  payload,
});

export const setAllTrue = () => ({
  type: SET_ALL_TRUE,
});

export const setIsSolvedTasksLoading = (payload) => ({
  type: SET_IS_SOLVED_TASKS_LOADING,
  payload,
});

export const setIsUnresolvedTasksLoading = (payload) => ({
  type: SET_IS_UNRESOLVED_TASKS_LOADING,
  payload,
});

export const setIsBestSolutionsTasksLoading = (payload) => ({
  type: SET_IS_BEST_SOLUTIONS_TASKS_LOADING,
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR,
  payload: payload,
});


export const setInfo = (item) => ({
  type: SET_INFO,
  payload: item,
});

export const setSolvedTasks = (items) => ({
  type: SET_SOLVED_TASKS,
  payload: items,
});

export const setUnresolvedTasks = (items) => ({
  type: SET_UNRESOLVED_TASKS,
  payload: items,
});

export const setBestSolutionsTasks = (item) => ({
  type: SET_BEST_SOLUTIONS_TASKS,
  payload: item,
});

export const loadInfo = (id) => (dispatch) => {
  dispatch(setError(""));
  dispatch(setIsInfoLoading(false));
  
  usersAPI.getUserInfo(id)
  .then((response) => {
    dispatch(setInfo(response.data));
  }).catch((error) => {
    dispatch(setError(error));
  });
};

export const loadSolvedTask = (id) => (dispatch) => {
  dispatch(setError(""));
  dispatch(setIsSolvedTasksLoading(false));
  
  usersAPI.getListSolvedTasks(id)
  .then((response) => {
    dispatch(setSolvedTasks(response.data));
  }).catch((error) => {
    dispatch(setError(error));
    dispatch(setAllTrue());
  });
};

export const loadUnresolvedTasks = (id) => (dispatch) => {
  dispatch(setError(""));
  dispatch(setIsUnresolvedTasksLoading(false));
  
  usersAPI.getListUnresolvedTasks(id)
  .then((response) => {
    dispatch(setUnresolvedTasks(response.data));
  }).catch((error) => {
    dispatch(setError(error));
    dispatch(setAllTrue());
  });
};

export const loadBestSolutionsTasks = (id) => (dispatch) => {
  dispatch(setError(""));
  dispatch(setIsBestSolutionsTasksLoading(false));
  
  usersAPI.getListBestSolutionsTasks(id)
  .then((response) => {
    dispatch(setBestSolutionsTasks(response.data));
  }).catch((error) => {
    dispatch(setError(error));
    dispatch(setAllTrue());
  });
};


