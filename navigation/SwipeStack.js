import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Results from '../pages/Results';
import ChosenItem from '../pages/ChosenItem';
import Swipe from '../pages/Swipe';

import Colors from '../styles/Colors';

const Stack = createStackNavigator();


export default function SwipeStack() {
  const color = Colors()
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Swipe" component={Swipe}
        options={{
          headerStyle: {backgroundColor: color.background},
          headerTitleStyle: {color: color.text}
        }}
      />
    </Stack.Navigator>
  );
}