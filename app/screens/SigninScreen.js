import {Text, Button, Divider, withStyles} from '@ui-kitten/components';
import deepmerge from 'deepmerge';
import React, {useContext, useReducer} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import {Context} from '../utils/globalStore';
import {useMutation} from '@apollo/react-hooks';
import {ADD_ACCOUNTS_LOCAL_MUTATION} from '../graphql';
import {getStoreValue} from '../utils/storage';
import {decrypt} from '../utils/crypto';
import ComponentInput from '../components/ComponentInput';
import style from '../styles/style';
import Logger from '../utils/Logger';

const initialState = {
  req: {
    username: '',
    password: '',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'username':
      return deepmerge(state, {req: {username: action.payload}});
    case 'password':
      return deepmerge(state, {req: {password: action.payload}});
    default:
      throw new Error();
  }
};

const Signin = (props) => {
  const styles = props.eva.style;
  const [postState, dispatch] = useReducer(reducer, initialState);
  const [dataRefetch, dataDispatch] = useContext(Context);
  const [addAccounts] = useMutation(ADD_ACCOUNTS_LOCAL_MUTATION, {
    onCompleted: (_data) => {
      dataDispatch({
        type: 'SET_STATE',
        payload: {
          username: 'INDIVIDUAL',
          vaultToken: postState.req.password,
        },
      });
    },
    onError: (_error) => {
      Logger.logError('Error in adding accounts to cache: ', _error);
    },
  });
  const validate = () => {
    if (!postState.req.password) {
      Toast.show('Password cannot be empty');
      return false;
    }
    return true;
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, styles.justifyCenter]}>
      <View style={styles.formContainer}>
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <Text category="h6">Sign in</Text>
          </View>
          <ComponentInput
            text="Please enter password to signin or to create an account"
            placeholder="********"
            autoCompleteType={'password'}
            autoCapitalize="none"
            secureTextEntry={true}
            name="password"
            generatePassword={false}
            value={postState.req.password}
            dispatch={dispatch}
            styles={styles}
          />
        </View>
        <View style={styles.justifySpaceBetween}>
          <Button
            style={styles.submitButton}
            onPress={() => {
              if (validate()) {
                getStoreValue('@accounts')
                  .then((data) => {
                    if (!dataRefetch.vaultToken) {
                      if (data) {
                        try {
                          const decryptItem = decrypt(
                            data,
                            postState.req.password,
                          );
                          if (decryptItem) {
                            addAccounts({
                              variables: {
                                account: decryptItem,
                              },
                            });
                          }
                        } catch (err) {
                          Toast.show('Incorrect password, please try again');
                          dataDispatch({
                            type: 'SET_VAULT_TOKEN',
                            payload: null,
                          });
                          //removeStoreValue('@accounts');
                        }
                      } else {
                        dataDispatch({
                          type: 'SET_STATE',
                          payload: {
                            username: 'NEW',
                            vaultToken: postState.req.password,
                          },
                        });
                      }
                    }
                  })
                  .catch((err) => {
                    Logger.logError(err);
                    Toast.show('Error: ', err.message);
                  });
              }
            }}>
            CONTINUE
          </Button>
        </View>
        <Divider style={styles.divider} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const SigninScreen = withStyles(Signin, (theme) => style(theme));

export default SigninScreen;
