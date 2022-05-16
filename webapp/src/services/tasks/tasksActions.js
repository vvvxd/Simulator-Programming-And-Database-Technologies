import {tasksAPI} from '../../api/api';
import {SET_TASKS, SET_TASKS_ERROR, SET_TASKS_LOADED} from './tasksTypes';

export const setTasksLoaded = (payload) => ({
  type: SET_TASKS_LOADED,
  payload,
});

export const setTasks = (items) => ({
  type: SET_TASKS,
  payload: items,
});

export const setTasksError = (payload) => ({
  type: SET_TASKS_ERROR,
  payload,
});

export const fetchTasks = () => (dispatch) => {
  dispatch(setTasksLoaded(false));
  dispatch(setTasksError(false));
  
  tasksAPI.getUserTasks()
  .then((response) => {
    dispatch(setTasks(response.data));
  })
  .catch((error) => {
    dispatch(setTasksError(true));
    console.log(error.message);
  });
};