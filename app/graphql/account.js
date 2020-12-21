import gql from 'graphql-tag';

export const GET_ACCOUNT_QUERY = gql`
  query accounts($username: String!) {
    accounts(username: $username) {
      id
      account
    }
  }
`;

export const ADD_ACCOUNT_MUTATION = gql`
  mutation addAccount($accountInput: AccountInput!) {
    addAccount(accountInput: $accountInput) {
      id
      account
    }
  }
`;

export const ADD_ACCOUNTS_LOCAL_MUTATION = gql`
  mutation addAccounts($account: Account) {
    addAccounts(account: $account) @client {
      id
    }
  }
`;

export const GET_ACCOUNTS_LOCAL_QUERY = gql`
  query getAccounts {
    userAccounts @client {
      id
      username
      password
      website
      type
      name
      createdAt
      updatedAt
      notes
    }
  }
`;
