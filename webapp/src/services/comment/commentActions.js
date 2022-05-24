import {commentsARI} from '../../api/api';
import {SET_COMMENT, SET_INPUT_VALUE_TEXT, SET_IS_LOADING, SET_ITEMS} from './commentTypes';
import {SET_ERROR} from '../stats/statsTypes';

export const setInputValueText = (payload) => ({
  type: SET_INPUT_VALUE_TEXT,
  payload,
});

export const setIsLoading = (items) => ({
  type: SET_IS_LOADING,
  payload: items,
});

export const setItems = (payload) => ({
  type: SET_ITEMS,
  payload: payload,
});


export const setError = (payload) => ({
  type: SET_ERROR,
  payload: payload,
});

export const setComment = (payload) => ({
  type: SET_COMMENT,
  payload: payload,
});

export const fetchComments = (tasksId) => (dispatch) => {
  dispatch(setIsLoading(false));
  dispatch(setError(""));
  dispatch(setItems([]));
  
  commentsARI.getComments(tasksId)
  .then((response) => {
    dispatch(setItems(response.data));
  }).catch((error) => {
    dispatch(setError(error));
  });
  
};

export const addComment = (tasksId, text) => (dispatch) => {
  dispatch(setIsLoading(false));
  dispatch(setError(""));
  dispatch(setItems([]));
  
  commentsARI.addComment(tasksId, text)
  .then(()=>commentsARI.getComments(tasksId))
  .then((response) => {
    dispatch(setItems(response.data));
  })
  .catch((error) => {
    dispatch(setError(error));
  });
  
};