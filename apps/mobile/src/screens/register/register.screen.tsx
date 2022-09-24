import React, { FC } from 'react';
import { RegisterForm } from '../../components/auth/register/form';
import { Layout } from '../../components/ui/layout';

export const RegisterScreen: FC = () => {
  return (
    <Layout>
      <RegisterForm />
    </Layout>
  );
};
