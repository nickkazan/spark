import React, { useReducer, useEffect, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import * as SecureStore from 'expo-secure-store';
import AuthContext from './context/auth-context.js'

import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Home from './pages/Home'
import Results from './pages/Results'
import ChosenItem from './pages/ChosenItem'

Amplify.configure(awsconfig)
const Stack = createStackNavigator()

export default function App() {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isSignedIn: true,
            userToken: action.userToken,
            userData: action.userData
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignedIn: true,
            userToken: action.userToken,
            userData: action.userData
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignedIn: false,
            userToken: null,
            userData: null
          };
      }
    },
    {
      isSignedIn: false,
      userToken: null,
      userData: null
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const grabUserData = async () => {
      let userToken
      let userData
      try {
        userToken = await SecureStore.getItemAsync('userToken');
        userData = await SecureStore.getItemAsync('userData');
      } catch (e) {
        console.log("failed to find user data locally")
      }
      userToken && userData ? dispatch({ type: 'RESTORE_TOKEN', userToken: userToken, userData: userData }) : null
    };

    grabUserData();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async () => {
        const currentUser = await Auth.currentAuthenticatedUser()
        const userData = currentUser.signInUserSession.idToken.payload
        
        // There are more params that can be grabbed but these are the only useful ones for now
        const email = userData['email']
        const username = userData['cognito:username']
        const userToken = (await Auth.currentSession()).getAccessToken().getJwtToken();

        await SecureStore.setItemAsync('userToken', userToken)
        await SecureStore.setItemAsync('userData', JSON.stringify({email, username}))
        dispatch({ type: 'SIGN_IN', token: userToken, userData: {email, username} });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async () => {
        const currentUser = await Auth.currentAuthenticatedUser()
        const userData = currentUser.signInUserSession.idToken.payload
        
        // There are more params that can be grabbed but these are the only useful ones for now
        const email = userData['email']
        const username = userData['cognito:username']
        const userToken = (await Auth.currentSession()).getAccessToken().getJwtToken();

        await SecureStore.setItemAsync('userToken', userToken)
        await SecureStore.setItemAsync('userData', JSON.stringify({email, username}))
        dispatch({ type: 'SIGN_IN', token: userToken, userData: {email, username} });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          { state.isSignedIn === true ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Results" component={Results} />
              <Stack.Screen name="ChosenItem" component={ChosenItem} />
            </>
          ) : (
            <>
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Signin" component={Signin} />
            </>
          ) }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}