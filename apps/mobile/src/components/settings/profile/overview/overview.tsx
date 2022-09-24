import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../../../constants';
import { useAppSelector } from '../../../../hooks/redux.hook';
import { ProfilePicture } from '../../../ui/profile-picture';

export interface OverviewProps {
  onEdit: () => void;
}

export const ProfileOverview: FC<OverviewProps> = ({ onEdit }) => {
  const user = useAppSelector((state) => state.auth.session?.attributes);

  return user ? (
    <TouchableOpacity onPress={onEdit} style={styles.container}>
      <View style={styles.picture}>
        <ProfilePicture picture={user.picture} size={60} />
      </View>
      <View style={styles.data}>
        <Text style={styles.fieldWrapper}>
          Username: <Text style={styles.field}>{user.username}</Text>
        </Text>
        {user.firstName && (
          <Text style={styles.fieldWrapper}>
            First Name: <Text style={styles.field}>{user.firstName}</Text>
          </Text>
        )}
        {user.lastName && (
          <Text style={styles.fieldWrapper}>
            Last Name: <Text style={styles.field}>{user.lastName}</Text>
          </Text>
        )}
      </View>
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    shadowColor: theme.colors.card.shadow,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: theme.colors.card.background,
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 25,
    width: '90%',
    marginVertical: 10,
  },
  picture: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  data: {},
  fieldWrapper: {
    fontSize: 12,
    color: theme.colors.text,
    marginVertical: 5,
  },
  field: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.success,
  },
});
