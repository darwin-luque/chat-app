import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider as PaperProvider } from 'react-native-paper';
import { Router } from './stacks/router';
import { store } from './store';
import { SocketProvider } from './contexts/socket';

export function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SocketProvider>
          <StatusBar barStyle="light-content" />
          <Router />
          <Toast />
        </SocketProvider>
      </PaperProvider>
    </Provider>
  );
}

export default App;
