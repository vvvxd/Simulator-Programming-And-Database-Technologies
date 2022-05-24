import {combineReducers} from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import bookReducer from "./book/bookReducer";
import tasksReducer from './tasks/tasksReducer';
import taskReducer from './task/taskReducer';
import queryReducer from './query/queryReducer';
import statsReducer from './stats/statsReducer';
import groupReducer from './group/groupReducer';
import commentReducer from './comment/commentReducer';
import profileReducer from './prifile/profileReducer';
import adminTasksReducer from './adminTasks/adminTasksReducer';

const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
  auth: authReducer,
  tasks: tasksReducer,
  task: taskReducer,
  query: queryReducer,
  stats: statsReducer,
  group: groupReducer,
  comment: commentReducer,
  profile: profileReducer,
  adminTasks: adminTasksReducer,
});

export default rootReducer;
