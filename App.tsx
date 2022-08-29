import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from './src/pages/Settings';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import { useEffect, useState } from 'react';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/pages/Home';
import StackNavigator from './src/navigations/StackNavigator';
import { Provider, useSelector } from 'react-redux';
import store from './src/store';
import { RootState } from './src/store/reducer';
import Router from './Router';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: { orderId: string };
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};


function App() {
  // state는 전체 상태에서 뽑은것
  // 전체 상태는 rootReducer에 있는 RootState
  // const isLoggedIn = useSelector((state: RootState) => !!state.user.accessToken);

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e: any) {
      console.log(e.message);
    }
  });

  return (
    <Provider store={store}>
      <Router />
    </Provider>

    // <NavigationContainer>
    //   {isLoggedIn ? (
    //     <Tab.Navigator>
    //       <Tab.Screen
    //         name="Orders"
    //         component={Orders}
    //         options={{ title: '홈' }}
    //       />
    //       <Tab.Screen
    //         name="Delivery"
    //         component={Delivery}
    //         options={{ headerShown: false }}
    //       />
    //       <Tab.Screen
    //         name="Settings"
    //         component={Settings}
    //         options={{ title: '내 정보' }}
    //       />
    //     </Tab.Navigator>
    //   ) : (
    //     <Stack.Navigator>
    //       <Stack.Screen
    //         name="홈"
    //         component={Home}
    //         options={{
    //           title: '홈',
    //           headerShown: false
    //         }}
    //       />
    //       <Stack.Screen
    //         name="SignIn"
    //         component={SignIn}
    //         options={{
    //           title: '로그인',
    //           headerTitleAlign: 'center',
    //           headerStyle: {
    //             backgroundColor: '#29b6f6'
    //           },
    //           headerTintColor: '#FFFFFF',
    //           headerTitleStyle: {
    //             fontWeight: 'bold',
    //             fontSize: 20
    //           }
    //         }}
    //       />
    //       <Stack.Screen
    //         name="SignUp"
    //         component={SignUp}
    //         options={{ title: '회원가입' }}
    //       />
    //     </Stack.Navigator>
    //   )}
    // </NavigationContainer>
  );
}

export default App;