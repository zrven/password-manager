import gql from 'graphql-tag';

export const ADD_USER_QUERY = gql`
  mutation addUser($userInput: UserInput!) {
    addUser(userInput: $userInput) {
      id
      userName
      password
      status
      type
      attempts
    }
  }
`;

export const GET_USER_QUERY = gql`
  query accounts($username: String!) {
    accounts(username: $username) {
      id
      userName
      password
      status
      token
      secret
      attempts
      type
      createdAt
      updatedAt
    }
  }
`;

export const LOGIN_QUERY = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      id
      userName
      password
      status
      secret
      attempts
      type
      createdAt
      updatedAt
    }
  }
`;
