import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./src/navigations/StackNavigator";
import { useSelector } from "react-redux";
import { RootState } from "./src/store/reducer";
import TabNavigator from "./src/navigations/TabNaigator";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Router = () => {
  const [isLog, setIsLogin] = useState<boolean>(false);
  const isLoggedIn = useSelector((state: RootState) => !!state.user.accessToken);

  const getToken = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    console.log("refreshToken", refreshToken);


    const token = await AsyncStorage.getItem('accessToken');
    console.log("accessToken", token);
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }

  }
  useEffect(() => {
    // const item = AsyncStorage.removeItem('accessToken');
    // console.log(item);
    getToken()
  }, []);


  return (
    <NavigationContainer>
      {isLog ? (
        <TabNavigator />
      ) : <StackNavigator />
      }
    </NavigationContainer>
  )
}
export default Router;