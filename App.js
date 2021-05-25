import React, { useState, useReducer, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';

import AuthContext from './context/auth-context.js';
import { stateReducer, initialState } from './context/reducers';
import { restoreToken } from './context/actions';
import { getUserData } from './context/utility';

import NavTab from './navigation/NavTab';
import AuthenticationStack from './navigation/AuthenticationStack';


Amplify.configure(awsconfig)

export default function App() {

  const [state, dispatch] = useReducer(stateReducer, initialState)
  const [fullUserData, setFullUserData] = useState({})

  useEffect(() => {
    const getUserDataAsync = async () => {
      setFullUserData(await getUserData())
   }
   getUserDataAsync()
  }, [])

  useEffect(() => {
    dispatch(restoreToken(fullUserData.userToken, fullUserData.userData, fullUserData.savedActivities, fullUserData.colorMode, fullUserData.profilePicture))
  }, [fullUserData])

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      <NavigationContainer>
          { state.isSignedIn === true ? (
              <NavTab/>
          ) : (
            <AuthenticationStack/>
          ) }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}