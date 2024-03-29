import { combineReducers } from 'redux';
import { userReducer } from './user';
import { postsReducer } from './posts';
import { loginModalReducer } from './loginModal';
import { userListReducer } from './userList';
import { composePostModalReducer } from './composePostModal';
import { conversationReducer } from './conversation';
import { reportModalReducer } from './reportModal';
import { searchReducer } from './search';
import { notificationsReducer } from './notifications';
import { confirmEmailModalReducer } from './confirmEmailModal';
import { topicsReducer } from './topics';

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  loginModal: loginModalReducer,
  userList: userListReducer,
  composePostModal: composePostModalReducer,
  conversation: conversationReducer,
  reportModal: reportModalReducer,
  search: searchReducer,
  notifications: notificationsReducer,
  confirmEmailModal: confirmEmailModalReducer,
  topics: topicsReducer,
});