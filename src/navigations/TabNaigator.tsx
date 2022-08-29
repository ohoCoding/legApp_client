import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-ionicons'
import Home from '../pages/Home';
import Orders from '../pages/Orders';
import Delivery from '../pages/Delivery';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';

          if (route.name === '홈') {
            iconName += 'home-outline';
          } else if (route.name === '동네생활') {
            iconName += 'newspaper-outline';
          } else if (route.name === "내 근처") {
            iconName += "pin-outline";
          } else if (route.name === '나의 당근') {
            iconName += 'person-outline';
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? 'tomato' : 'grey'}
              size={26}
            />

          );
        },
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: "#ff7f00",
        tabBarInactiveBackgroundColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#ff7f00',
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          fontSize: 10,
        }
      })}
    >
      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="동네생활" component={Orders} />
      <Tab.Screen name="내 근처" component={Delivery} />
      <Tab.Screen name="나의 당근" component={Settings} />
    </Tab.Navigator >
  )
}

export default TabNavigator;