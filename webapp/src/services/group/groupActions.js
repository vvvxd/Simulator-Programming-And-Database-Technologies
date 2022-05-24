import {groupsAPI} from '../../api/api';
import {SET_ALL_GROUP, SET_ERROR_ALL_GROUP, SET_IS_LOADING_ALL_GROUP} from './groupTypes';


export const setIsLoadingAllGroup = (payload) => ({
  type: SET_IS_LOADING_ALL_GROUP,
  payload,
});

export const setErrorAllGroup = (payload) => ({
  type: SET_ERROR_ALL_GROUP,
  payload: payload,
});

export const setAllGroup = (item) => ({
  type: SET_ALL_GROUP,
  payload: item,
});


export const loadGroups = () => (dispatch) => {
  dispatch(setErrorAllGroup(false));
  dispatch(setIsLoadingAllGroup(false));
  
  groupsAPI.getGroups()
  .then((response) => {
    dispatch(setAllGroup(response.data));
  }).catch((error) => {
    dispatch(setErrorAllGroup(error));
  });
};

export const addGroup = (name, shortName) => (dispatch) => {
  groupsAPI.addGroup(name, shortName)
  .then(() => dispatch((loadGroups())))
};

export const updateGroup = (id, name, shortName) => (dispatch) => {
  groupsAPI.updateGroup(id, name, shortName)
  .then(() => dispatch((loadGroups())))
};

export const deleteGroup = (id) => (dispatch) => {
  groupsAPI.deleteGroup(id)
  .then(() => dispatch((loadGroups())))
};
