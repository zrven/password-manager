// Apollo Provider
import {
  InMemoryCache,
  HttpLink,
  ApolloLink,
  ApolloClient,
  from,
} from 'apollo-boost';
import Config from 'react-native-config';
import {setContext} from 'apollo-link-context';
import AsyncStorage from '@react-native-community/async-storage';
import typeDefs from '../graphql/local';
import resolvers from '../resolvers/resolver';
import {Platform} from 'react-native';
import {removeStoreValue, getStoreValue} from '../utils/storage';
import Logger from '../utils/Logger';

export function useApolloGraphClient() {
  const cache = new InMemoryCache();
  const httpLink = new HttpLink({
    uri:
      Platform.OS === 'ios'
        ? Config.GRAPH_API_URL
        : Config.GRAPH_ANDROID_API_URL,
  });

  const _storeData = async (authorization, bearer) => {
    try {
      let token = authorization;
      if (bearer) {
        let tokenArray = authorization.split(' ');
        token = tokenArray[1];
      }

      await AsyncStorage.setItem('token', token);
    } catch (error) {
      // Error saving data
    }
  };


  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      const context = operation.getContext();
      let authorization = null;
      const {
        response: {headers},
      } = context;
      if (headers) {
        authorization = headers.get('authorization');
        if (authorization) {
          //store token
          _storeData(authorization, true);
        }
      }

      if (response && response.data) {
        const data = response.data;
        // Get auth token from login response payload
        if (!authorization && data && data.login && data.login.authorization) {
          //authorization = data.login.authorization;
          _storeData(authorization, true);
        }
        // Get auth token from signup response payload
        if (
          !authorization &&
          data &&
          data.confirmSignup &&
          data.confirmSignup.authorization
        ) {
          authorization = data.confirmSignup.authorization;
          _storeData(authorization, false);
        }
      }

      if (response.errors) {
        // Handle corner case scenario. Users will not be able to login if token goes out of sync.
        // Logout and remove item from AsynStorage.
        response.errors.map((err) => {
          if (err.message.includes('Response: 401')) {
            removeStoreValue('token');
            removeStoreValue('@user');
          }
        });
      }
      return response;
    });
  });

  const authLink = setContext((_, {headers}) => {
    // get the authentication token
    // return the headers to the context so httpLink can read them
    return getStoreValue('token')
      .then((token) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      })
      .catch((err) => {
        Logger.logError(err);
      });
  });

  const client = new ApolloClient({
    link: from([afterwareLink, authLink, httpLink]),
    cache,
    typeDefs,
    resolvers,
  });

  client.cache.writeData({
    data: {
      userAccounts: [],
      signinUser: {
        id: '',
        userId: '',
        token: '',
        isLoggedIn: false,
        firstName: '',
        lastName: '',
        signedupRole: '',
        __typename: 'SigninUser',
      },
    },
  });

  return client;
}
