import * as AT from "./authTypes";
import axios from "axios";
import {usersAPI} from '../../../api/api';

const AUTH_URL = "http://localhost:8081/rest/user/authenticate";

export const authenticateUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await usersAPI.auth(email,password);
    localStorage.setItem("jwtToken", response.data.token);
    dispatch(success({
      username: response.data.name,
      isLoggedIn: true,
      email: response.data.email,
      id: response.data.id,
      urlImg: !!response.data.urlImg ? response.data.urlImg : "",
      mobile: response.data.mobile
    }));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(failure());
    return Promise.reject(error);
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    dispatch(success({username: "", isLoggedIn: false}));
  };
};

const loginRequest = () => {
  return {
    type: AT.LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: AT.LOGOUT_REQUEST,
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};
