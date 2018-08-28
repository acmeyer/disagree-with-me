import { combineReducers } from 'redux';
import { userReducer } from './user';
import { postsReducer } from './posts';
import { loginModalReducer } from './loginModal';
import { userListReducer } from './userList';

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  loginModal: loginModalReducer,
  userList: userListReducer,
});