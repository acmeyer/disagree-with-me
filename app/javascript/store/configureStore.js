'use strict';

import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducers from '../reducers';
import promise from './promise';
import array from './array';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {environment} from '../env';


const logger = createLogger({
  collapsed: true,
  duration: true,
});

let enhancer;
if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(
    applyMiddleware(thunk, promise, array, logger)
  );
} else {
  enhancer = compose(
    applyMiddleware(thunk, promise, array)
  );
}

function configureStore() {
  const persistConfig = {
    key: 'reduxPersist/v1/dwm/' + environment + '/',
    storage,
    blacklist: ['loginModal', 'composePostModal', 'conversation'],
  };
  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = createStore(persistedReducer, {}, enhancer);
  const persistor = persistStore(store);
  return {store, persistor};
}

export default configureStore;
