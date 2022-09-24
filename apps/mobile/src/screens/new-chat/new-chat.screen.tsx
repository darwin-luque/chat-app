import React, { FC } from 'react';
import { ContactsList } from '../../components/chats/contacts/list';
import { Layout } from '../../components/ui/layout';

export const NewChatScreen: FC = () => {
  return (
    <Layout>
      <ContactsList />
    </Layout>
  );
};
