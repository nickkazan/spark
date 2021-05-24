import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';

import Colors from '../styles/Colors';

const Stack = createStackNavigator();


export default function AuthenticationStack() {
  const color = Colors()
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signup" component={Signup} 
        options={{
          headerStyle: {backgroundColor: color.background},
          headerTitleStyle: {color: color.text}
        }}
      />
      <Stack.Screen name="Signin" component={Signin} 
        options={{
          headerStyle: {backgroundColor: color.background},
          headerTitleStyle: {color: color.text}
        }}
      />
    </Stack.Navigator>
  );
}

