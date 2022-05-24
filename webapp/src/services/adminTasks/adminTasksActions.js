import {tasksAPI} from '../../api/api';
import {SET_ALL_TASKS, SET_ERROR_ALL_TASKS, SET_IS_LOADING_ALL_TASKS} from './adminTasksTypes';


export const setIsLoading = (payload) => ({
  type: SET_IS_LOADING_ALL_TASKS,
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR_ALL_TASKS,
  payload: payload,
});

export const setAllTasks = (item) => ({
  type: SET_ALL_TASKS,
  payload: item,
});

export const loadTasks = () => (dispatch) => {
  dispatch(setError(false));
  dispatch(setIsLoading(false));
  
  tasksAPI.getAllTasks()
  .then((response) => {
    dispatch(setAllTasks(response.data));
  }).catch((error) => {
    dispatch(setError(error));
  });
};

export const addTasks = (referenceQuery, title, serialNumber, description) => (dispatch) => {
  tasksAPI.addTasks(referenceQuery, title, serialNumber, description)
  .then(() => dispatch((loadTasks())))
};

export const updateTask = (id, referenceQuery, title, serialNumber, description) => (dispatch) => {
  tasksAPI.updateTask(id, referenceQuery, title, serialNumber, description)
  .then(() => dispatch((loadTasks())))
};

export const deleteTask = (id) => (dispatch) => {
  tasksAPI.deleteTask(id)
  .then(() => dispatch((loadTasks())))
};
