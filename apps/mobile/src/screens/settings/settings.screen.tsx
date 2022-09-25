import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProfileOverview } from '../../components/settings/profile/overview';
import { ProfileLogout } from '../../components/settings/profile/logout';
import { Layout } from '../../components/ui/layout';
import { useAppDispatch } from '../../hooks/redux.hook';
import { logoutAction } from '../../store/modules';

export const SettingsScreen: FC = () => {
  const dispatch = useAppDispatch();
  const onEdit = () => {
    console.log('edit');
  };

  const onLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <Layout>
      <View style={styles.container}>
        <ProfileOverview onEdit={onEdit} />
        <View style={styles.spacer} />
        <ProfileLogout onLogout={onLogout} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  spacer: {
    flex: 1,
  },
});
