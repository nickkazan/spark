import { Auth } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';

export const getUserData = async () => {
  let userToken
  let userData
  let savedActivities
  try {
    userToken = await SecureStore.getItemAsync('userToken')
    userData = await SecureStore.getItemAsync('userData')
    savedActivities = await SecureStore.getItemAsync('savedActivitiesIds')
    // await SecureStore.deleteItemAsync('savedActivitiesIds')
    // await SecureStore.deleteItemAsync('savedActivities')

  } catch (e) {
    console.log("failed to find user data locally")
  }
  return {userToken, userData, savedActivities}
};

export const getSavedActivities = async () => {
  let savedActivitiesIds = await SecureStore.getItemAsync('savedActivitiesIds')
  let savedActivities = []
  if (savedActivitiesIds) {
    savedActivitiesIds.forEach(id => {
      let URL = "http://192.168.1.67:8080/business-id-lookup/" + id
      fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        response.json().then((data) => {
          console.log(data)
          savedActivities.push(data)
        });
      })
      .catch((error) => {
        console.error(error)
      });
    
    })
  }
  return savedActivities
}

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

  return {userToken, userData}
};

export const storeActivity = async (activityId) => {
  let savedActivities = []
  console.log("Activity Data: ", activityId)
  try { 
    const currentSavedActivities =  await SecureStore.getItemAsync('savedActivitiesIds')
    if (JSON.parse(currentSavedActivities)) {
      savedActivities = JSON.parse(currentSavedActivities)
    }
    console.log("Array in StoreActivity: ", savedActivities)
  } catch (e) {
    console.log(e)
  }
  // Need to add a check to see if it already exists in the list
  savedActivities.push(activityId)
  await SecureStore.setItemAsync('savedActivitiesIds', JSON.stringify(savedActivities))
  return savedActivities
}
