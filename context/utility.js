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
  } catch (e) {
    console.log("failed to find user data locally")
  }
  return {userToken, userData, savedActivities}
};

export const logUserOutOfAccount = async () => {
  try {
    await SecureStore.deleteItemAsync('userToken')
    await SecureStore.deleteItemAsync('userData')
    await SecureStore.deleteItemAsync('savedActivitiesIds')
  } catch (e) {
    console.log("failed to delete local user information")
  }
}

export const getSavedActivities = async () => {
  const requestData = async (id) => {
    let URL = "http://192.168.1.67:8080/business-id-lookup/" + id
    return new Promise((resolve, reject) => {
      fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        response.json().then((data) => {
          resolve(data)
        });
      })
      .catch((error) => {
        console.error(error)
      });
    })
  }

  let savedActivitiesIdsJSON = await SecureStore.getItemAsync('savedActivitiesIds')
  let savedActivitiesIds = JSON.parse(savedActivitiesIdsJSON)
  let savedActivities = []
  if (savedActivitiesIds) {
    for (const id of savedActivitiesIds) {
      savedActivities.push(requestData(id))
    }
    return Promise.all(savedActivities).then((allSavedActivities) => {
      return allSavedActivities
    })
  }
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
  console.log("HEEEERRRRREEEEE")
  console.log(userToken)
  console.log(userData)

  return {userToken, userData}
};

export const storeActivity = async (activityId) => {
  let savedActivities = []
  try { 
    const currentSavedActivities =  await SecureStore.getItemAsync('savedActivitiesIds')
    if (JSON.parse(currentSavedActivities)) {
      savedActivities = JSON.parse(currentSavedActivities)
    }
  } catch (e) {
    console.log(e)
  }
  if (!savedActivities.includes(activityId)) {
    savedActivities.push(activityId)
    await SecureStore.setItemAsync('savedActivitiesIds', JSON.stringify(savedActivities))  
  }
  return savedActivities
}

export const deleteActivity = async (activityId) => {
  let savedActivities = []
  try { 
    const currentSavedActivities =  await SecureStore.getItemAsync('savedActivitiesIds')
    if (JSON.parse(currentSavedActivities)) {
      savedActivities = JSON.parse(currentSavedActivities)
    }
  } catch (e) {
    console.log(e)
  }
  if (savedActivities.includes(activityId)) {
    savedActivities.splice(savedActivities.indexOf(activityId), 1)
    await SecureStore.setItemAsync('savedActivitiesIds', JSON.stringify(savedActivities))  
  }
  return savedActivities
}

