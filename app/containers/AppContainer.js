import React, {useContext, useRef} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeStackNavigator} from '../navigation/home.navigation';
import Analytics from '../utils/analytics';
import {Context} from '../utils/globalStore';
import SignUpNavigator from '../navigation/signup.navigator';
import {ThemeContext} from '../theme-context';

const Stack = createStackNavigator();

const AppContainer = () => {
  const {theme} = useContext(ThemeContext);
  const [dataRefetch] = useContext(Context);
  const routeNameRef = useRef();
  const navigationRef = useRef();
  const renderScreens = () => {
    return dataRefetch && dataRefetch.vaultToken ? (
      <Stack.Screen name="HomeScreen">
        {(props) => <HomeStackNavigator {...props} />}
      </Stack.Screen>
    ) : (
      <Stack.Screen
        name="SignUpNavigatorScreen"
        component={SignUpNavigator}
        options={{title: 'everypass', headerShown: false}}
      />
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme === 'dark' ? DarkTheme : DefaultTheme}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          Analytics.setCurrentScreen(currentRouteName);
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator headerMode="none">{renderScreens()}</Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
