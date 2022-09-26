export enum ActionTypes {
  // AuthActions
  CHECK_SESSION = 'CHECK_SESSION',
  LOGOUT = 'LOGOUT',

  LOGIN_START = 'LOGIN_START',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',

  REGISTER_START = 'REGISTER_START',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL',

  UPDATE_PROFILE_START = 'UPDATE_PROFILE_START',
  UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL',

  // ContactsActions
  LIST_CONTACTS_START = 'LIST_CONTACTS_START',
  LIST_CONTACTS_SUCCESS = 'LIST_CONTACTS_SUCCESS',
  LIST_CONTACTS_FAIL = 'LIST_CONTACTS_FAIL',

  // Conversations Action
  LIST_CONVERSATIONS_START = 'LIST_CONVERSATIONS_START',
  LIST_CONVERSATIONS_SUCCESS = 'LIST_CONVERSATIONS_SUCCESS',
  LIST_CONVERSATIONS_FAIL = 'LIST_CONVERSATIONS_FAIL',

  FIND_OR_CREATE_CONVERSATION_START = 'FIND_OR_CREATE_CONVERSATION_START',
  FIND_OR_CREATE_CONVERSATION_SUCCESS = 'FIND_OR_CREATE_CONVERSATION_SUCCESS',
  FIND_OR_CREATE_CONVERSATION_FAIL = 'FIND_OR_CREATE_CONVERSATION_FAIL',

  // Messages Actions
  LIST_MESSAGES_START = 'LIST_MESSAGES_START',
  LIST_MESSAGES_SUCCESS = 'LIST_MESSAGES_SUCCESS',
  LIST_MESSAGES_FAIL = 'LIST_MESSAGES_FAIL',

  SEND_MESSAGE_START = 'SEND_MESSAGE_START',
  SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS',
  SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL',
}
