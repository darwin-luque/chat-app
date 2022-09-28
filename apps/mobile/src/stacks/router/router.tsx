import React, { FC, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from '../auth';
import { AUTH_STACK, MAIN_STACK } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { checkForSessionAction } from '../../store/modules';
import { MainStack } from '../main';
import { SocketContext } from '../../contexts/socket';

const Stack = createNativeStackNavigator();

export const Router: FC = () => {
  const { onInit, onDisconnect, socket } = useContext(SocketContext);
  const session = useAppSelector((state) => state.auth.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket && session?.attributes.id) {
      onInit(session.attributes.id);
    }
    return () => onDisconnect();
  }, [onDisconnect, onInit, session?.attributes.id, socket]);

  useEffect(() => {
    dispatch(checkForSessionAction());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          <Stack.Screen name={MAIN_STACK} component={MainStack} />
        ) : (
          <Stack.Screen name={AUTH_STACK} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
