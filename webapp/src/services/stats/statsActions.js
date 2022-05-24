import {statsAPI} from '../../api/api';
import {
  SET_BEST_ITEM,
  SET_DECISION_ITEMS,
  SET_ERROR, SET_IS_BEST_LOADING, SET_IS_DECISION_LOADING,
  SET_IS_STATS_LOADING,
  SET_STATS_ITEM
} from './statsTypes';


export const setIsStatsLoading = (payload) => ({
  type: SET_IS_STATS_LOADING,
  payload,
});

export const setIsBestLoading = (payload) => ({
  type: SET_IS_BEST_LOADING,
  payload,
});

export const setIsDecisionLoading = (payload) => ({
  type: SET_IS_DECISION_LOADING,
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR,
  payload: payload,
});

export const setStatsItem = (item) => ({
  type: SET_STATS_ITEM,
  payload: item,
});

export const setBestItem = (item) => ({
  type: SET_BEST_ITEM,
  payload: item,
});

export const setDecisionItems = (items) => ({
  type: SET_DECISION_ITEMS,
  payload: items,
});


export const loadStats = (taskId) => (dispatch) => {
  dispatch(setError(""));
  dispatch(setIsStatsLoading(false));
  
  statsAPI.getTaskStats(taskId)
  .then((response) => {
    dispatch(setStatsItem(response.data));
  }).catch((error) => {
     dispatch(setError(error));
  });
  
};

export const loadBest = (taskId) => (dispatch) => {
  dispatch(setError(""));
  dispatch(setIsBestLoading(false));
  
  statsAPI.getWorstTaskQuery(taskId)
  .then((response) => {
    dispatch(setBestItem(response.data));
  }).catch((error) => {
    dispatch(setError(error));
  });
};

export const loadDecisions = (taskId) => (dispatch) => {
  dispatch(setError(""));
  dispatch(setIsDecisionLoading(false));
  
  statsAPI.getTaskWrongQueries(taskId)
  .then((response) => {
    dispatch(setDecisionItems(response.data));
  }).catch((error) => {
    dispatch(setError(error));
  });
};


