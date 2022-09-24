import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProfileOverview } from '../../components/settings/profile/overview';
import { Layout } from '../../components/ui/layout';

export const SettingsScreen: FC = () => {
  const onEdit = () => {
    console.log('edit');
  };

  return (
    <Layout>
      <View style={styles.container}>
        <ProfileOverview onEdit={onEdit} />
        <Text>Settings</Text>
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
});
