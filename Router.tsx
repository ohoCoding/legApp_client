import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./src/navigations/StackNavigator";
import { useSelector } from "react-redux";
import { RootState } from "./src/store/reducer";
import TabNavigator from "./src/navigations/TabNaigator";
import messaging from '@react-native-firebase/messaging';

const Router = () => {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.accessToken);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <TabNavigator />
      ) : <StackNavigator />
      }
    </NavigationContainer>
  )
}
export default Router;