import {tasksAPI} from '../../api/api';
import {SET_ACTIVE_TASK_ID, SET_CHECK_PAGE, SET_TASK, SET_TASK_ERROR, SET_TASK_LOADED} from './taskTypes';

export const setTaskLoaded = (payload) => ({
  type: SET_TASK_LOADED,
  payload,
});
export const setCheckPage = (payload) =>({
  type: SET_CHECK_PAGE,
  payload,
});
export const setTask = (item) => ({
  type: SET_TASK,
  payload: item,
});

export const setActiveTaskId = (payload) => ({
  type: SET_ACTIVE_TASK_ID,
  payload: payload,
});

export const setTaskError = (payload) => ({
  type: SET_TASK_ERROR,
  payload,
});


export const fetchTask = (id) => (dispatch) => {
  dispatch(setTaskLoaded(false));
  dispatch(setTaskError(false));
  
  tasksAPI.getTaskInfo(id)
  .then((response) => {
    dispatch(setTask(response.data));
  })
  .catch((error) => {
    dispatch(setTaskError(true));
    console.log(error.message);
  });
};



