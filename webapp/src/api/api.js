import axios from "axios";
import {
  ADD_COMMENT,
  ADD_GROUP,
  ADD_TASKS,
  AUTH_URL,
  CHECK_SELECT,
  DELETE_BOOK,
  DELETE_GROUP,
  DELETE_TASK,
  EXECUTE_SELECT,
  FETCH_ALL_BOOK,
  FETCH_BOOK,
  FETCH_LAN,
  FETCH_TYPES,
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
  SAVE_BOOK,
  SEARCH_BOOK,
  TASK_STATS,
  TASK_WRONG_QUERIES,
  UPDATE_BOOK,
  UPDATE_GROUP,
  UPDATE_TASK,
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


export const BookAPI = {
  saveBook(book) {
    return axios.post(SAVE_BOOK, book);
  },
  fetchBook(bookId) {
    return axios.get(FETCH_BOOK + bookId);
  },
  updateBook(book) {
    return axios.post(UPDATE_BOOK, book)
  },
  deleteBook(bookId) {
    return axios.delete(DELETE_BOOK + bookId)
  },
  fetchLanguages() {
    return axios.get(FETCH_LAN);
  },
  fetchTypes() {
    return axios.get(FETCH_TYPES)
  },
  findAllBooks(currentPage, pageSize, user) {
    return axios
    .get(FETCH_ALL_BOOK +
      "?pageNumber=" +
      currentPage +
      "&pageSize=" +
      pageSize +
      "&user=" +
      user
    )
  },
  searchData(search, currentPage, size, user) {
    return axios
    .get(
      SEARCH_BOOK +
      search +
      "?page=" +
      currentPage +
      "&size=" +
      size +
      "&user=" +
      user
    );
  }
}



