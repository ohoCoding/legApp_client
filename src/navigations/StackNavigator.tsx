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
import SignUpPhone from '../components/SignUp/SignUpPhone';
import SignUpAgree from '../components/SignUp/SignUpAgree';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.accessToken);
  return (

    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }} />
      <Stack.Screen name="SignIn" component={SignIn} />
      {/* <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          }
        }} /> */}
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="MyPage" component={Settings} />
      <Stack.Screen
        name="SignUpAgree"
        component={SignUpAgree}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          }
        }} />
      <Stack.Screen
        name="SignUpPhone"
        component={SignUpPhone}
        options={{
          title: '휴대폰 인증',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          }
        }} />
    </Stack.Navigator>

  );
};

export default StackNavigator;