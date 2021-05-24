import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import Results from '../pages/Results';
import ChosenItem from '../pages/ChosenItem';

import Colors from '../styles/Colors';

const Stack = createStackNavigator();


export default function HomeStack() {
  const color = Colors()

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}
        options={{
          headerStyle: {backgroundColor: color.background},
          headerTitleStyle: {color: color.text}
        }}
      />
      <Stack.Screen name="Results" component={Results}
        options={{
          headerStyle: {backgroundColor: color.background},
          headerTitleStyle: {color: color.text}
        }}
      />
      <Stack.Screen name="ChosenItem" component={ChosenItem}
        options={{
          headerStyle: {backgroundColor: color.background},
          headerTitleStyle: {color: color.text}
        }}
      />
    </Stack.Navigator>
  );
}