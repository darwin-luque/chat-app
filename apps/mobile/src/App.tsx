import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { Router } from './stacks/router';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <Router />
    </Provider>
  );
};

export default App;
