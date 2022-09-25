import { useNavigation } from '@react-navigation/native';
import { FC, useLayoutEffect } from 'react';
import { UpdateProfileForm } from '../../components/settings/profile/update-form/update-form';
import { Layout } from '../../components/ui/layout';
import { useAppSelector } from '../../hooks/redux.hook';

export const UpdateProfileScreen: FC = () => {
  const username = useAppSelector(
    (state) => state.auth.session?.attributes.username
  );
  const navigator = useNavigation();

  useLayoutEffect(() => {
    navigator.setOptions({
      headerTitle: username ?? '',
    });
  }, [navigator, username]);

  return (
    <Layout>
      <UpdateProfileForm />
    </Layout>
  );
};
