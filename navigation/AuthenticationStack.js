import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../pages/Signup'
import Signin from '../pages/Signin';

const Stack = createStackNavigator();


export default function AuthenticationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Signin" component={Signin} />
    </Stack.Navigator>
  );
}

