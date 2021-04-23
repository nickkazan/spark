import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../navigation/HomeStack';
// import Profile from '../pages/Profile';
import Results from '../pages/Results';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function NavTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#2a9d8f',
        showLabel: false,
        style: { height: 50 }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={35} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-profile" color={color} size={35} />
          ),
          // tabBarBadge: 3,
        }}
      /> */}
    </Tab.Navigator>
  );
}
