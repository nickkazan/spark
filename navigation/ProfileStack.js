import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../pages/Profile';
import Results from '../pages/Results';
import ChosenItem from '../pages/ChosenItem';

const Stack = createStackNavigator();


export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="Results" component={Results}/>
      <Stack.Screen name="ChosenItem" component={ChosenItem}/>
    </Stack.Navigator>
  );
}