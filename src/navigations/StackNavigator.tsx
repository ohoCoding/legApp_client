import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import TabNavigator from '../navigations/TabNaigator';
import Settings from '../pages/Settings';
import Orders from '../pages/Orders';
import Home from '../pages/Home';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.accessToken);
  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="MyPage" component={Settings} />
    </Stack.Navigator>

  );
};

export default StackNavigator;