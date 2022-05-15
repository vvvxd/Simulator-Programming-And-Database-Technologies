import axios from "axios";
import {
  AUTH_URL,
  DELETE_BOOK,
  FETCH_ALL_BOOK,
  FETCH_BOOK,
  FETCH_LAN,
  FETCH_TYPES,
  RANDOM_API,
  REGISTER_URL,
  SAVE_BOOK, SEARCH_BOOK,
  UPDATE_BOOK
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
  searchData(search,currentPage,size,user){
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



