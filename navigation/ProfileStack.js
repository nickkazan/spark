import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../pages/Profile';

const Stack = createStackNavigator();


export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile}/>
      {/* Add more screens from within the Profile section */}
    </Stack.Navigator>
  );
}