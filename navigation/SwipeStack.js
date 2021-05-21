import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Results from '../pages/Results';
import ChosenItem from '../pages/ChosenItem';
import Swipe from '../pages/Swipe';

const Stack = createStackNavigator();


export default function SwipeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Swipe" component={Swipe}/>
    </Stack.Navigator>
  );
}