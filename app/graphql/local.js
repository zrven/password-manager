import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Account @client {
    id: String
    name: String
    username: String
    password: String
    notes: String
    type: String
    website: String
    autofill: Boolean
    createdAt: String
    updatedAt: String
  }
  extend type userAccounts @client {
    id: String
    name: String
    username: String
    password: String
    notes: String
    type: String
    website: String
    autofill: Boolean
    createdAt: String
    updatedAt: String
  }
`;
