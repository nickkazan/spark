import { Auth } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';

export const getUserData = async () => {
  let userToken
  let userData
  let savedActivities
  let colorMode
  let profilePicture
  try {
    userToken = await SecureStore.getItemAsync('userToken')
    userData = await SecureStore.getItemAsync('userData')
    savedActivities = JSON.parse(await SecureStore.getItemAsync('savedActivitiesIds'))
    colorMode = await SecureStore.getItemAsync('colorMode')
    profilePicture = await SecureStore.getItemAsync('profilePicture')
  } catch (e) {
    console.log("failed to find user data locally")
  }
  return {userToken, userData, savedActivities, colorMode, profilePicture}
};

export const logUserOutOfAccount = async () => {
  try {
    await SecureStore.deleteItemAsync('userToken')
    await SecureStore.deleteItemAsync('userData')
    await SecureStore.deleteItemAsync('savedActivitiesIds')
    await SecureStore.deleteItemAsync('profilePicture')
  } catch (e) {
    console.log("failed to delete local user information")
  }
}

export const getSavedActivitiesFromDynamo = async (username) => {
  const URL = "http://192.168.1.67:8080/get-activities/" + username
  return new Promise((resolve, reject) => {
    fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },      
    })
    .then((response) => {
      response.json().then((data) => {
        return resolve(data)
      });
    })
    .catch((error) => {
      reject(error)
      console.error(error)
    });
  })
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
        reject(error)
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
  } else {
    return savedActivities
  }
}

export const getSavedActivityById = async (id) => {
  console.log(`Grabbing data for ${id}...`)
  let URL = "http://192.168.1.67:8080/business-id-lookup/" + id
  return new Promise((resolve, reject) => {
    fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((data) => {
        return resolve(data)
      });
    }).catch((error) => {
      console.error(error)
    });  
  })
}

export const saveColorMode = async (colorMode) => {
  await SecureStore.setItemAsync('colorMode', colorMode)
}

export const saveProfilePicture = async (profilePicture) => {
  await SecureStore.setItemAsync('profilePicture', profilePicture)
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
  const formattedUserData = JSON.stringify({firstName, lastName, email, username})
  await SecureStore.setItemAsync('userToken', userToken)
  await SecureStore.setItemAsync('userData', formattedUserData)

  return {userToken, userData: formattedUserData}
};

export const storeActivitiesFromDynamo = async (savedActivitiesIds) => {
  await SecureStore.setItemAsync('savedActivitiesIds', JSON.stringify(savedActivitiesIds))
}

export const storeActivity = async (username, activityId) => {
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
    SecureStore.setItemAsync('savedActivitiesIds', JSON.stringify(savedActivities))
    fetch('http://192.168.1.67:8080/put-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },      
      body: JSON.stringify({username, activityId})
    })
    .then((response) => {
      response.json().then((data) => {
        console.log(data)
      });
    })
    .catch((error) => {
      console.error(error)
    });
  }
  return savedActivities
}

export const deleteActivity = async (username, activityId) => {
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

    fetch('http://192.168.1.67:8080/delete-activity', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },      
      body: JSON.stringify({username, activityId})
    })
    .then((response) => {
      response.json().then((data) => {
        console.log(data)
      });
    })
    .catch((error) => {
      console.error(error)
    });
  }
  return savedActivities
}