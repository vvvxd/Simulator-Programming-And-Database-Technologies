import axios from "axios";
import {
  ADD_COMMENT,
  ADD_GROUP,
  ADD_TASKS, ADD_USER,
  AUTH_URL,
  CHECK_SELECT,
  DELETE_GROUP,
  DELETE_TASK,
  DELETE_USER,
  EXECUTE_SELECT,
  GET_ALL_TASKS,
  GET_COMMENTS,
  GET_LIST_BEST_SOLUTIONS_TASKS,
  GET_LIST_SOLVED_TASKS,
  GET_LIST_UNRESOLVED_TASKS,
  GET_TASK_INFO,
  GET_USER_INFO,
  GET_USER_TASKS,
  GROUPS,
  RANDOM_API,
  REGISTER_URL,
  TASK_STATS,
  TASK_WRONG_QUERIES,
  UPDATE_GROUP, UPDATE_PROFILE,
  UPDATE_TASK,
  UPDATE_USER,
  USERS,
  WORST_TASK_QUERY
} from './urls';


export const usersAPI = {
  registerUser(userObject) {
    return axios.post(REGISTER_URL, userObject);
  },
  fetchUsers() {
    return axios.get(RANDOM_API);
  },
  auth(email, password) {
    return axios.post(AUTH_URL, {
      email: email,
      password: password,
    })
  },
  getUserInfo(id) {
    return axios.get(GET_USER_INFO + "/" + id);
  },
  getListSolvedTasks(id) {
    return axios.get(GET_LIST_SOLVED_TASKS + "/" + id);
  },
  getListUnresolvedTasks(id) {
    return axios.get(GET_LIST_UNRESOLVED_TASKS + "/" + id);
  },
  getListBestSolutionsTasks(id) {
    return axios.get(GET_LIST_BEST_SOLUTIONS_TASKS + "/" + id);
  },
  getUsers() {
    return axios.get(USERS);
  },
  addUser(email, password, firstName, lastName, userGroupId, role) {
    return axios.post(ADD_USER, {
      id: null,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      userGroupId: userGroupId,
      role: role
    })
  },
  updateUser(id, email, password, firstName, lastName, userGroupId, role) {
    return axios.post(UPDATE_USER, {
      id: id,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      userGroupId: userGroupId,
      role: role
    })
  },
  updateProfile(id, email, firstname, lastname, password){
    return axios.post(UPDATE_PROFILE, {
      id: id,
      email: email,
      password: password,
      firstName: firstname,
      lastName: lastname,
    })
  },
  deleteUser(id) {
    return axios.post(DELETE_USER, {
      id: id,
    })
  },
}

export const tasksAPI = {
  getUserTasks() {
    return axios.get(GET_USER_TASKS);
  },
  getTaskInfo(id) {
    return axios.get(GET_TASK_INFO + "/" + id);
  },
  getAllTasks() {
    return axios.get(GET_ALL_TASKS);
  },
  addTasks(referenceQuery, title, serialNumber, description) {
    return axios.post(ADD_TASKS, {
      id: null,
      referenceQuery: referenceQuery,
      title: title,
      serialNumber: serialNumber,
      description: description
    })
  },
  updateTask(id, referenceQuery, title, serialNumber, description) {
    return axios.post(UPDATE_TASK, {
      id: id,
      referenceQuery: referenceQuery,
      title: title,
      serialNumber: serialNumber,
      description: description
    })
  },
  deleteTask(id) {
    return axios.post(DELETE_TASK, {
      id: id,
    })
  },
}


export const queryAPI = {
  executeSelect(text) {
    return axios.post(EXECUTE_SELECT, {
      text: text,
    })
  },
  checkSelect(sql, taskId) {
    return axios.post(CHECK_SELECT, {
      sql: sql,
      taskId: taskId,
    })
  }
}

export const statsAPI = {
  getWorstTaskQuery(id) {
    return axios.get(WORST_TASK_QUERY + "/" + id);
  },
  getTaskWrongQueries(id) {
    return axios.get(TASK_WRONG_QUERIES + "/" + id);
  },
  getTaskStats(id) {
    return axios.get(TASK_STATS + "/" + id);
  }
}


export const groupsAPI = {
  getGroups() {
    return axios.get(GROUPS);
  },
  addGroup(name, shortName) {
    return axios.post(ADD_GROUP, {
      id: null,
      name: name,
      shortName: shortName,
    });
  },
  updateGroup(id, name, shortName) {
    return axios.post(UPDATE_GROUP, {
      id: id,
      name: name,
      shortName: shortName,
    });
  },
  deleteGroup(id) {
    return axios.post(DELETE_GROUP, {
      id: id,
    });
  },
}


export const commentsARI = {
  getComments(id) {
    return axios.get(GET_COMMENTS + "/" + id);
  },
  addComment(tasksId, text) {
    return axios.post(ADD_COMMENT, {
      tasksId: tasksId,
      text: text,
    });
  }
}

