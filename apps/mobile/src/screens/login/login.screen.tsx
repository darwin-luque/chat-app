import React, { FC } from 'react';
import { LoginForm } from '../../components/auth/login/form';
import { Layout } from '../../components/ui/layout';

export const LoginScreen: FC = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};
