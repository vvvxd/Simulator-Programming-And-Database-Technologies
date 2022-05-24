import {
  SET_BEST_ITEM,
  SET_DECISION_ITEMS,
  SET_ERROR,
  SET_IS_BEST_LOADING,
  SET_IS_DECISION_LOADING,
  SET_IS_STATS_LOADING,
  SET_STATS_ITEM,
} from './statsTypes';

const initialState = {
  isLoadingStats: false,
  isLoadingBest: false,
  isLoadingDecision: false,
  error: "",
  statsItem: null,
  bestItem: null,
  decisionItems: [],
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_STATS_LOADING:
      return {
        ...state,
        isLoadingStats: action.payload,
      };
    case SET_IS_BEST_LOADING:
      return {
        ...state,
        isLoadingBest: action.payload,
      };
    case SET_IS_DECISION_LOADING:
      return {
        ...state,
        isLoadingDecision: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: true,
      };
    case SET_STATS_ITEM:
      return {
        ...state,
        statsItem: action.payload,
        isLoadingStats: true,
      };
    case SET_BEST_ITEM:
      return {
        ...state,
        bestItem: action.payload,
        isLoadingBest: true,
      };
    case SET_DECISION_ITEMS:
      return {
        ...state,
        decisionItems: action.payload,
        isLoadingDecision: true,
      };
    
    default:
      return state;
  }
};

export default reducer;