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
  const { onInit, onDisconnect, listenToMessages } = useContext(SocketContext);
  const { jwtToken, payload } =
    useAppSelector((state) => state.auth.session?.accessToken) ?? {};
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (payload?.sub && jwtToken) {
      onInit(payload.sub);
      listenToMessages(jwtToken);
    }
    return () => onDisconnect();
  }, [jwtToken, listenToMessages, onDisconnect, onInit, payload?.sub]);

  useEffect(() => {
    dispatch(checkForSessionAction());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {jwtToken ? (
          <Stack.Screen name={MAIN_STACK} component={MainStack} />
        ) : (
          <Stack.Screen name={AUTH_STACK} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
