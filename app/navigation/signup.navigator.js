import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SigninScreen from '../screens/SigninScreen';

const Stack = createStackNavigator();

const SignUpNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={'SigninScreen'} component={SigninScreen} />
  </Stack.Navigator>
);

export default SignUpNavigator;
