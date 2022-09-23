import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, Text, StatusBar } from 'react-native';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Chat App</Text>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
