import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../pages/Home';
import Orders from '../pages/Orders';
import Delivery from '../pages/Delivery';
import Settings from '../pages/Settings';
import MainPage from '../pages/MainPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='홈'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';

          if (route.name === '홈') {
            iconName += 'home-outline';
          } else if (route.name === '주문 현황') {
            iconName += 'newspaper-outline';
            // } else if (route.name === "내 근처") {
            //   iconName += "pin-outline";
          } else if (route.name === '마이 페이지') {
            iconName += 'person-outline';
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? '#00C1DE' : 'black'}
              style={
                {
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  fontSize: 35,
                  fontStyle: 'italic'
                }
              }
              size={50}
            />

          );
        },
        tabBarShowLabel: true,
        // tabBarActiveBackgroundColor: "#ff7f00",
        // tabBarInactiveBackgroundColor: 'gray',
        headerTitleStyle: {
          fontSize: 50,
        },
        tabBarStyle: {
          backgroundColor: '#ffff',
          // borderTopColor: '#ff7f00',
          justifyContent: 'center',
          alignItems: 'center',
          height: 80,
          fontSize: 30,
          paddingBottom: 20,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          // borderLeftColor: 'black'
        }
      })}
    >
      <Tab.Screen name="홈" component={MainPage}
        options={{ headerShown: false }}
      // options={{
      //   title: '주소 확인',
      //   headerTitleAlign: 'center',
      //   headerTitleStyle: {
      //     fontSize: 20,
      //     fontWeight: 'bold',
      //   }
      // }}
      />
      <Tab.Screen name="주문 현황" component={Orders} />
      {/* <Tab.Screen name="내 근처" component={Delivery} /> */}
      <Tab.Screen name="마이 페이지" component={Settings} />
    </Tab.Navigator >
  )
}

export default TabNavigator;