import * as UT from "./userTypes";
import {usersAPI} from '../../api/api';
import {loadInfo} from "../prifile/profileActions";

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(userRequest());
    usersAPI.fetchUsers()
        .then((response) => {
          dispatch(userSuccess(response.data));
        })
        .catch((error) => {
          dispatch(userFailure(error.message));
        });
  };
};

export const registerUser = (userObject) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const response = await usersAPI.registerUser(userObject);
    dispatch(userSavedSuccess(response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(userFailure(error.message));
    return Promise.reject(error);
  }
};
export const updateProfile = (id, firstName, lastName, password) => (dispatch) => {
  usersAPI.updateProfile(id, firstName, lastName, password).then(() => dispatch(loadInfo(id)))
}
export const updateUser = (id, email, password, firstName, lastName, userGroupId, role) => (dispatch) => {
  usersAPI.updateUser(id, email, password, firstName, lastName, userGroupId, role).then(() => dispatch(loadInfo(id)))
}
const userRequest = () => {
  return {
    type: UT.USER_REQUEST,
  };
};

const userSavedSuccess = (user) => {
  return {
    type: UT.USER_SAVED_SUCCESS,
    payload: user,
  };
};

const userSuccess = (users) => {
  return {
    type: UT.USER_SUCCESS,
    payload: users,
  };
};

const userFailure = (error) => {
  return {
    type: UT.USER_FAILURE,
    payload: error,
  };
};