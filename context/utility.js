import { Auth } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';

//Start of functions that return values
export const getUserData = async () => {
  let userToken
  let userData
  let savedActivities
  try {
    userToken = await SecureStore.getItemAsync('userToken');
    userData = await SecureStore.getItemAsync('userData');
    savedActivities = await SecureStore.getItemAsync('savedActivities');
  } catch (e) {
    console.log("failed to find user data locally")
  }
  return {userToken, userData, savedActivities}
};
//End of functions that return values


//Start of void functions
export const storeSignInData = async () => {
  const currentUser = await Auth.currentAuthenticatedUser()
  const userData = currentUser.signInUserSession.idToken.payload

  // There are more params that can be grabbed but these are the only useful ones for now
  const firstName = userData['given_name']
  const lastName = userData['family_name']
  const email = userData['email']
  const username = userData['cognito:username']
  const userToken = (await Auth.currentSession()).getAccessToken().getJwtToken();

  await SecureStore.setItemAsync('userToken', userToken)
  await SecureStore.setItemAsync('userData', JSON.stringify({firstName, lastName, email, username}))
};

export const storeActivity = async (activity) => {
  let savedActivities
  try {
    savedActivities = await SecureStore.getItemAsync('savedActivities');
  } catch (e) {
    console.log(e)
  }
  savedActivities.push(activity)
  savedActivities = await SecureStore.setItemAsync('savedActivities');
}
//End of void functions