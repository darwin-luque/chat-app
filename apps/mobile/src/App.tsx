import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { Router } from './stacks/router';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <Router />
      <Toast />
    </Provider>
  );
};

export default App;
