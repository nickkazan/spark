import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../navigation/HomeStack';
import ProfileStack from '../navigation/ProfileStack';
import SwipeStack from './SwipeStack';

const Tab = createBottomTabNavigator();

export default function NavTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#2a9d8f',
        showLabel: false,
        tabStyle: {
          width: 100
        },
        iconStyle: {
          width: 35,
          height: 60
        },
        style: { height: 50 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Swipe"
        component={SwipeStack}
        options={{
          tabBarLabel: 'Swipe',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cards" color={color} size={35} />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={35} />
          ),
          // tabBarBadge: 3,
        }}
      />

    </Tab.Navigator>
  );
}
