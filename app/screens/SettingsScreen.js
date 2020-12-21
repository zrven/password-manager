import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {Card, Icon, List, Text, withStyles} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {Pressable, View} from 'react-native';
import Rate, {AndroidMarket} from 'react-native-rate';
import {ThemeContext} from '../theme-context';
import {removeStoreValue} from '../utils/storage';
import {Context} from '../utils/globalStore';
import {ADD_ACCOUNTS_LOCAL_MUTATION} from '../graphql/account';
import style from '../styles/style';
import Logger from '../utils/Logger';

const listData = [
  {
    id: 1,
    key: 'about',
    name: 'About',
    icon: 'alert-circle-outline',
  },
  {
    id: 2,
    key: 'help',
    name: 'Help',
    icon: 'question-mark-circle-outline',
  },
  {
    id: 3,
    key: 'preferences',
    name: 'Preferences',
    icon: 'settings-outline',
  },
  {
    id: 4,
    key: 'remove',
    name: 'Remove account',
    icon: 'person-delete-outline',
  },
  {
    id: 5,
    key: 'signout',
    name: 'Signout',
    icon: 'log-out-outline',
  },
];

const Settings = (props) => {
  const {theme} = useContext(ThemeContext);
  const styles = props.eva.style;
  const [, dataDispatch] = useContext(Context);
  const client = useApolloClient();
  const [addAccounts] = useMutation(ADD_ACCOUNTS_LOCAL_MUTATION, {
    onCompleted: (_data) => {
      Logger.logInfo('Call successful ', _data);
    },
    onError: (_error) => {
      Logger.logError('Error in adding accounts to cache: ', _error);
    },
  });

  const renderItem = ({item}) => {
    return (
      <Card style={styles.cardContainer}>
        <Pressable
          onPress={() => {
            if (item.key === 'signout' || item.key === 'remove') {
              removeStoreValue('token');
              removeStoreValue('@user');
              if (item.key === 'remove') {
                removeStoreValue('@accounts');
              }
              const req = [
                {
                  id: '',
                  __typename: 'AccountItem',
                  name: '',
                  type: '',
                  username: '',
                  password: '',
                  notes: '',
                  website: '',
                  autofill: false,
                  createdAt: '',
                  updatedAt: '',
                },
              ];
              addAccounts({
                variables: {
                  account: req,
                },
              });
              try {
                //client.cache.reset();
                // Always initialize the objects after reset
                client.writeData({
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
              } catch (err) {}
              dataDispatch({type: 'SET_VAULT_TOKEN', payload: null});
            }
          }}>
          <View style={styles.settingsContainer}>
            <Icon
              style={styles.icon}
              fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
              name={item.icon}
            />
            <Text category="s1" style={styles.text}>
              {item.name}
            </Text>
          </View>
        </Pressable>
      </Card>
    );
  };

  return (
    <List
      contentContainerStyle={styles.container}
      data={listData}
      renderItem={renderItem}
      key={(item) => item.id}
    />
  );
};

const SettingsScreen = withStyles(Settings, (theme) => style(theme));

export default SettingsScreen;
