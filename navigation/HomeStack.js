import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import Results from '../pages/Results';
import ChosenItem from '../pages/ChosenItem';

const Stack = createStackNavigator();


export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Results" component={Results}/>
      <Stack.Screen name="ChosenItem" component={ChosenItem}/>
    </Stack.Navigator>
  );
}