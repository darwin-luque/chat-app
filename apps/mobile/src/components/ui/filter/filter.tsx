import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../../constants';

export interface ContactsListFilterProps {
  onFilter: (filter: string) => void;
}

export const ContactsListFilter: FC<ContactsListFilterProps> = ({
  onFilter,
}) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const id = setTimeout(() => {
      onFilter(filter);
    }, 300);

    return () => clearTimeout(id);
  }, [filter, onFilter]);

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={filter} onChangeText={setFilter} />
      <Icon name="search" size={24} color={theme.colors.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    justifyContent: 'space-between',
    backgroundColor: `${theme.colors.grays[700]}50`,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 26,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    flexDirection: 'row',
    color: theme.colors.text,
  },
});
