/* eslint-disable react/display-name */
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, useTheme} from '@ui-kitten/components';
import AccountScreen from '../screens/AccountScreen';
import ModifyScreen from '../screens/ModifyScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FeedScreen from '../screens/Feed';
import {ThemeContext} from '../theme-context';
import AddScreen from '../screens/Add';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeNavigator(props) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: props.theme === 'dark' ? '#FFFFFF' : '#000000',
        inactiveTintColor: '#808080',
      }}>
      <Tab.Screen
        name="Feed"
        initialParams={{refetch: false}}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon style={styles.icon} fill={color} name="home-outline" />
          ),
        }}>
        {(tabProps) => (
          <FeedScreen {...tabProps} signinUser={props.signinUser} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Add"
        initialParams={{refetch: false}}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({color}) => (
            <Icon style={styles.icon} fill={color} name="plus-outline" />
          ),
        }}>
        {(tabProps) => (
          <AddScreen {...tabProps} signinUser={props.signinUser} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="SettingsScreen"
        initialParams={{refetch: false}}
        options={{
          tabBarLabel: 'You',
          tabBarIcon: ({color}) => (
            <Icon style={styles.icon} fill={color} name="person-outline" />
          ),
        }}>
        {(tabProps) => (
          <SettingsScreen {...tabProps} signinUser={props.signinUser} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const HomeStackNavigator = (props) => {
  const deviceTheme = useContext(ThemeContext);
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
          color: theme['background-basic-color-1'],
        },
        headerTintColor: deviceTheme.theme === 'dark' ? '#FFFFFF' : '#000000',
        headerStyle: {},
      }}>
      <Stack.Screen
        name="Home"
        options={{
          headerTitle: '',
        }}>
        {(homeProps) => (
          <HomeNavigator {...homeProps} {...props} theme={deviceTheme.theme} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AccountScreen"
        options={{
          headerTitle: '',
        }}>
        {(homeProps) => <AccountScreen {...homeProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="ModifyScreen"
        options={{
          headerTitle: 'Edit Account',
        }}>
        {(homeProps) => <ModifyScreen {...homeProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
    textAlignVertical: 'center',
  },
});

export {HomeNavigator, HomeStackNavigator};
