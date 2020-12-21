import {useMutation, useQuery} from '@apollo/react-hooks';
import {Button, withStyles} from '@ui-kitten/components';
import deepmerge from 'deepmerge';
import React, {useContext, useReducer} from 'react';
import {View, ScrollView} from 'react-native';
import UUIDGenerator from 'react-native-uuid-generator';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import style from '../styles/style';

import {
  ADD_ACCOUNTS_LOCAL_MUTATION,
  GET_ACCOUNTS_LOCAL_QUERY,
} from '../graphql/account';
import {Context} from '../utils/globalStore';
import {setStoreValue} from '../utils/storage';
import {convertDate} from '../utils';
import {encrypt} from '../utils/crypto';
import AccountForm from '../components/AccountForm';
import Logger from '../utils/Logger';

/* STATE MANAGEMENT */
const initialState = {
  modal: {
    visible: false,
    title: 'Success',
    type: 'success',
    description: 'this is a default message ... not intended for you.',
  },
  req: {
    id: '',
    __typename: 'AccountItem',
    name: '',
    type: '',
    username: '',
    password: '',
    notes: '',
    website: '',
    autofill: false,
    createdAt: convertDate(new Date()),
    updatedAt: convertDate(new Date()),
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return deepmerge(state, {req: {name: action.payload}});
    case 'type':
      return deepmerge(state, {req: {type: action.payload}});
    case 'username':
      return deepmerge(state, {req: {username: action.payload}});
    case 'password':
      return deepmerge(state, {req: {password: action.payload}});
    case 'notes':
      return deepmerge(state, {req: {notes: action.payload}});
    case 'website':
      return deepmerge(state, {req: {website: action.payload}});
    case 'autofill':
      return deepmerge(state, {req: {autofill: action.payload}});
    case 'req':
      return deepmerge(state, {req: action.payload});
    case 'showModal':
      return deepmerge(state, {modal: action.payload});
    default:
      throw new Error();
  }
};

const Add = (props) => {
  const styles = props.eva.style;
  const [postState, dispatch] = useReducer(reducer, initialState);
  const [dataRefetch, dataDispatch] = useContext(Context);
  const {data: localData} = useQuery(GET_ACCOUNTS_LOCAL_QUERY, {
    onCompleted: (_data) => {
      Logger.logInfo(_data);
    },
    onError: (_error) => {
      Logger.logError('Error in getting accounts from cache: ', _error);
    },
  });
  const [addAccounts] = useMutation(ADD_ACCOUNTS_LOCAL_MUTATION, {
    onCompleted: (_data) => {
      Logger.logInfo('Call successful ', _data);
      dispatch({
        type: 'req',
        payload: {
          id: '',
          __typename: 'AccountItem',
          name: '',
          type: '',
          username: '',
          password: '',
          notes: '',
          website: '',
          autofill: false,
          createdAt: convertDate(new Date()),
          updatedAt: convertDate(new Date()),
        },
      });
      props.navigation.navigate('Feed');
    },
    onError: (_error) => {
      Logger.logError('Error in adding accounts to cache: ', _error);
    },
  });

  const validate = () => {
    if (!postState.req.name) {
      Toast.show('Name cannot be empty');
      return false;
    } else if (!postState.req.type) {
      Toast.show('Type cannot be empty');
      return false;
    } else if (!postState.req.username) {
      Toast.show('User name cannot be empty');
      return false;
    } else if (!postState.req.password) {
      Toast.show('Password cannot be empty');
      return false;
    }
    return true;
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, styles.screenPadding]}>
      <ScrollView>
        <AccountForm
          postState={postState}
          dispatch={dispatch}
          styles={styles}
        />
        <View style={styles.bottomContainer}>
          <Button
            style={styles.submitBtn}
            onPress={() => {
              if (validate()) {
                let formData = postState.req;
                UUIDGenerator.getRandomUUID((uuid) => {
                  formData.id = uuid;
                  let newData =
                    dataRefetch.username === 'NEW'
                      ? []
                      : localData.userAccounts;
                  if (dataRefetch.username === 'NEW') {
                    dataDispatch({
                      type: 'SET_USER',
                      payload: 'INDIVIDUAL',
                    });
                  }
                  newData.push(formData);
                  const req = {
                    id: 'ID123',
                    account: encrypt(newData, dataRefetch.vaultToken),
                  };
                  setStoreValue('@accounts', req.account);
                  addAccounts({variables: {account: newData}});
                });
              }
            }}>
            SAVE
          </Button>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const AddScreen = withStyles(Add, (theme) => style(theme));

export default AddScreen;
