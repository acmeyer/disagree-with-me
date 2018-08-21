import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../store/configureStore';
import App from './App';

class Root extends React.Component {
  componentWillMount() {
    this.storeObject = configureStore();
    this.store = this.storeObject.store;
    this.persistor = this.storeObject.persistor;
  }

  render() {
    return (
      <Provider store={this.store}>
        <PersistGate loading={null} persistor={this.persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

export default Root;