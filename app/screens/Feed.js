import React, {useContext, useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Card, Icon, Input, List, Text, withStyles} from '@ui-kitten/components';
import {View, Pressable} from 'react-native';
import RenderLeftSearchIcon from '../components/icons/RenderLeftSearchIcon';
import RenderRightCloseIcon from '../components/icons/RenderRightCloseIcon';
import {
  ADD_ACCOUNTS_LOCAL_MUTATION,
  GET_ACCOUNTS_LOCAL_QUERY,
} from '../graphql/account';
import style from '../styles/style';
import {ThemeContext} from '../theme-context';
import {getStoreValue} from '../utils/storage';
import {Context} from '../utils/globalStore';
import {decrypt} from '../utils';
import Logger from '../utils/Logger';

const Feed = (props) => {
  const styles = props.eva.style;
  const {theme} = useContext(ThemeContext);
  const [search, setSearch] = useState(null);
  const [dataRefetch, dataDispatch] = useContext(Context);
  const [loading] = useState(false);
  const [addAccounts] = useMutation(ADD_ACCOUNTS_LOCAL_MUTATION, {
    onCompleted: (_data) => {
      // Logger.logInfo('Call successful ', _data);
    },
    onError: (_error) => {
      Logger.logError('Error in adding accounts to cache: ', _error);
    },
  });
  const {data: localData} = useQuery(GET_ACCOUNTS_LOCAL_QUERY, {
    onCompleted: (_data) => {
      //Logger.logInfo(_data);
    },
    onError: (_error) => {
      Logger.logError('Error in getting accounts from cache: ', _error);
    },
  });
  const [listAccounts, setListAccounts] = useState(null);

  useEffect(() => {
    getStoreValue('@accounts')
      .then((data) => {
        if (data) {
          if (dataRefetch.vaultToken) {
            try {
              const decryptItem = decrypt(
                data,
                dataRefetch.vaultToken,
                dataDispatch,
              );
              if (decryptItem) {
                addAccounts({
                  variables: {
                    account: decryptItem,
                  },
                });
                setListAccounts(decryptItem);
              }
            } catch (err) {
              dataDispatch({type: 'SET_VAULT_TOKEN', payload: null});
            }
          }
        }
      })
      .catch((err) => {
        //Logger.logError(err);
      });
  }, [localData, dataRefetch.vaultToken]);

  const renderItem = ({item}) => {
    if (!item) {
      return;
    }

    return (
      <Card style={styles.listItem}>
        <Pressable
          onPress={() => {
            props.navigation.navigate('AccountScreen', {item});
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={styles.icon}
              fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
              name="globe-outline"
            />
            <View style={styles.view}>
              <Text category="s1">{item.name}</Text>
              <Text>{item.type}</Text>
            </View>
          </View>
        </Pressable>
      </Card>
    );
  };

  const handleSearch = () => {
    if (search) {
      const newListAccounts = localData.userAccounts.filter((item) => {
        let result = false;
        if (
          !result &&
          item.name.toUpperCase().indexOf(search.toUpperCase()) > -1
        ) {
          result = true;
        }
        if (
          !result &&
          item.username.toUpperCase().indexOf(search.toUpperCase()) > -1
        ) {
          result = true;
        }
        return result;
      });

      setListAccounts(newListAccounts);
    } else {
      setListAccounts(localData.userAccounts);
    }
  };
  const clearSearch = () => {
    setSearch('');
    setListAccounts(localData.userAccounts);
  };
  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={listAccounts ? listAccounts : null}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.subjectView}>
          <Input
            placeholder={'Search'}
            style={styles.input}
            name="search"
            status="basic"
            autoCorrect={false}
            autoCompleteType="username"
            autoCapitalize="none"
            accessoryLeft={(imgProps) => {
              return <RenderLeftSearchIcon {...imgProps} />;
            }}
            accessoryRight={(imgProps) => (
              <RenderRightCloseIcon
                {...imgProps}
                {...props}
                onPress={clearSearch}
              />
            )}
            returnKeyType="go"
            onChangeText={(text) => setSearch(text)}
            onSubmitEditing={(event) => {
              handleSearch(event);
            }}
            underlineColorAndroid="transparent"
            value={search}
          />
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          {!loading && (
            <Text category="s1">
              Welcome! Please add accounts safely to your encrypted vault.
            </Text>
          )}
        </View>
      }
    />
  );
};

const FeedScreen = withStyles(Feed, (theme) => style(theme));

export default FeedScreen;
