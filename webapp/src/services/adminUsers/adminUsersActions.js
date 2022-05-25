import {tasksAPI, usersAPI} from '../../api/api';
import {SET_ALL_USERS, SET_ERROR, SET_IS_LOADING} from './adminUsersTypes';


export const setIsLoading = (payload) => ({
  type: SET_IS_LOADING,
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR,
  payload: payload,
});

export const setAllUsers = (item) => ({
  type: SET_ALL_USERS,
  payload: item,
});

export const loadUsers = () => (dispatch) => {
  dispatch(setError(false));
  dispatch(setIsLoading(false));
  
  usersAPI.getUsers()
  .then((response) => {
    dispatch(setAllUsers(response.data));
  }).catch((error) => {
    dispatch(setError(error));
  });
};

export const addUser = (email, password, firstName, lastName, userGroupId, role) => (dispatch) => {
  usersAPI.addUser(email, password, firstName, lastName, userGroupId, role)
  .then(() => dispatch((loadUsers())))
};

export const updateTask = (id, email, password, firstName, lastName, userGroupId, role) => (dispatch) => {
  usersAPI.updateTask(id, email, password, firstName, lastName, userGroupId, role)
  .then(() => dispatch((loadUsers())))
};

export const deleteUser = (id) => (dispatch) => {
  usersAPI.deleteUser(id)
  .then(() => dispatch((loadUsers())))
};
