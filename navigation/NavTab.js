import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../navigation/HomeStack';
import ProfileStack from '../navigation/ProfileStack';

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
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={35} />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Test"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Test',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="face-profile" color={color} size={35} />
          ),
          // tabBarBadge: 3,
        }}
      />

    </Tab.Navigator>
  );
}
