import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './src/aws-exports'

import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Home from './pages/Home'
import Results from './pages/Results'
import ChosenItem from './pages/ChosenItem'

Amplify.configure(awsconfig)
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Signin" component={Signin}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="ChosenItem" component={ChosenItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}