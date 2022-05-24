import {queryAPI} from '../../api/api';
import {
  SET_CHECK_SELECT,
  SET_ERROR_CHECKING_SELECT,
  SET_ERROR_EXECUTING_SQL,
  SET_INPUT_VALUE_SQL,
  SET_IS_CHECKING_SELECT,
  SET_IS_EXECUTING_SQL,
  SET_SQL_ITEMS
} from './queryTypes';

export const setInputValueSql = (payload) => ({
  type: SET_INPUT_VALUE_SQL,
  payload,
});

export const setSqlItems = (items) => ({
  type: SET_SQL_ITEMS,
  payload: items,
});

export const setIsExecutingSql = (payload) => ({
  type: SET_IS_EXECUTING_SQL,
  payload,
});


export const setErrorExecutingSql = (payload) => ({
  type: SET_ERROR_EXECUTING_SQL,
  payload: payload,
});


export const executeSelect = (text) => (dispatch) => {
  dispatch(setIsExecutingSql(false));
  dispatch(setErrorExecutingSql(""));
  dispatch(setSqlItems([]));
  queryAPI.executeSelect(text)
  .then((response) => {
    if (response.data.error == null) {
      dispatch(setSqlItems(response.data.data));
    } else {
      dispatch(setErrorExecutingSql(response.data.error));
    }
  });
};


export const setCheckSelectResult = (item) => ({
  type: SET_CHECK_SELECT,
  payload: item,
});

export const setIsCheckingSelect = (payload) => ({
  type: SET_IS_CHECKING_SELECT,
  payload,
});


export const setErrorCheckingSelect = (payload) => ({
  type: SET_ERROR_CHECKING_SELECT,
  payload: payload,
});


export const checkSelect = (sql, taskId) => (dispatch) => {
  dispatch(setIsCheckingSelect(false));
  dispatch(setErrorCheckingSelect(""));
  dispatch(setCheckSelectResult(null));
  queryAPI.checkSelect(sql, taskId)
  .then((response) => {
    if (response.data.error == null) {
      if (response.data.data.error === "") {
        dispatch(setCheckSelectResult(response.data.data.decision));
      } else {
        dispatch(setErrorCheckingSelect(response.data.data.error));
      }
    } else {
      dispatch(setErrorCheckingSelect(response.data.error));
    }
  });
};



