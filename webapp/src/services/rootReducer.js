import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import bookReducer from "./book/bookReducer";
import tasksReducer from './tasks/tasksReducer';

const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
  auth: authReducer,
  tasks: tasksReducer,
});

export default rootReducer;
