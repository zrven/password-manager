import {Button, Divider, Icon, Text, withStyles} from '@ui-kitten/components';
import React, {useContext, useState} from 'react';
import {Linking, Pressable, View} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import {ThemeContext} from '../theme-context';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {
  ADD_ACCOUNTS_LOCAL_MUTATION,
  GET_ACCOUNTS_LOCAL_QUERY,
} from '../graphql/account';
import {setStoreValue} from '../utils/storage';
import {Context} from '../utils/globalStore';
import style from '../styles/style';
import {encrypt} from '../utils';
import Logger from '../utils/Logger';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const maskedText = (text, flag) => {
  if (!text) {
    return '';
  }

  if (flag) {
    return '**********';
  }
  return text;
};

const Account = (props) => {
  const styles = props.eva.style;
  const {theme} = useContext(ThemeContext);
  const {item} = props.route.params;
  const [mask, setMask] = useState(true);
  const [dataRefetch, dataDispatch] = useContext(Context);
  const {data: localData} = useQuery(GET_ACCOUNTS_LOCAL_QUERY, {
    onCompleted: (_data) => {
      Logger.logInfo(_data);
    },
    onError: (_error) => {
      Logger.logError('Error in getting accounts from cache: ', _error);
    },
  });
  const [addAccounts, {data: _data}] = useMutation(
    ADD_ACCOUNTS_LOCAL_MUTATION,
    {
      onCompleted: (_data) => {
        Logger.logInfo('Call successful ', _data);
        props.navigation.navigate('Feed');
      },
      onError: (_error) => {
        Logger.logError('Error in adding accounts to cache: ', _error);
      },
    },
  );
  const copyToClipboard = async (copyText) => {
    if (!copyText) {
      return;
    }
    await Clipboard.setString(copyText);
  };
  return (
    <KeyboardAwareScrollView style={[styles.container, styles.screenPadding]}>
      <View style={styles.subContainer}>
        <Text category="h4" style={styles.text}>
          {item.name}
        </Text>
        <Text category="s1" style={styles.text}>
          {item.type}
        </Text>
        <Pressable
          onPress={async () => {
            const url =
              item.website && item.website.includes('http')
                ? item.website
                : 'https://' + item.website;
            const supported = await Linking.canOpenURL(url);
            if (supported) {
              Linking.openURL(item.website);
            }
          }}>
          <Text category="s1" style={styles.link}>
            {item.website}
          </Text>
        </Pressable>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.subContainer}>
        <Text category="label" style={styles.text}>
          Login
        </Text>
        <Pressable
          onPress={() => {
            copyToClipboard(item.username);
            Toast.show('Copied to clipboard');
          }}>
          <Text category="h6" style={styles.text}>
            {item.username}
          </Text>
        </Pressable>
      </View>
      <View style={styles.subContainer}>
        <Text category="label" style={styles.text}>
          Password
        </Text>
        <Pressable
          onPress={() => {
            copyToClipboard(item.password);
            Toast.show('Copied to clipboard');
          }}>
          <View style={styles.rowContainer}>
            <Text category="h6" style={styles.text}>
              {maskedText(item.password, mask)}
            </Text>
            {mask ? (
              <Icon
                style={styles.icon}
                fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
                name="eye-outline"
                onPress={() => setMask(false)}
              />
            ) : (
              <Icon
                style={styles.icon}
                fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
                name="eye-off-outline"
                onPress={() => setMask(true)}
              />
            )}
          </View>
        </Pressable>
        <View style={styles.bar}>
          <BarPasswordStrengthDisplay
            barContainerStyle={styles.bar}
            password={item.password}
          />
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.subContainer}>
        <Text category="label" style={styles.text}>
          Notes
        </Text>
        <Text category="s1" style={styles.text}>
          {item.notes}
        </Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.subContainer}>
        <Text
          category="label"
          style={styles.text}>{`Modified on ${item.updatedAt}`}</Text>
      </View>
      <View style={[styles.rowContainer, styles.paddingTwenty]}>
        <Button
          style={styles.submitBtn}
          onPress={() => {
            let newData = localData.userAccounts;
            let newNewData = newData.filter((account) => {
              return account.id !== item.id;
            });
            const req = {
              id: 'ID123',
              account: encrypt(newNewData, dataRefetch.vaultToken),
            };
            setStoreValue('@accounts', req.account);
            addAccounts({variables: {account: newNewData}});
          }}>
          Delete
        </Button>
        <Button
          style={styles.submitBtn}
          onPress={() => {
            props.navigation.navigate('ModifyScreen', {item: item});
          }}>
          Edit
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

const AccountScreen = withStyles(Account, (theme) => style(theme));

export default AccountScreen;
