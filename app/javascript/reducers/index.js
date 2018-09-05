import { combineReducers } from 'redux';
import { userReducer } from './user';
import { postsReducer } from './posts';
import { loginModalReducer } from './loginModal';
import { userListReducer } from './userList';
import { composePostModalReducer } from './composePostModal';

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  loginModal: loginModalReducer,
  userList: userListReducer,
  composePostModal: composePostModalReducer,
});