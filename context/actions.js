export const actionTypes = {
  RESTORE_TOKEN: 'RESTORE_TOKEN',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SAVE_ACTIVITIES: 'SAVE_ACTIVITIES',
  DELETE_ACTIVITY: 'DELETE_ACTIVITY'
};

export const restoreToken = (userToken, userData, savedActivities) => ({
  type: actionTypes.RESTORE_TOKEN,
  userToken,
  userData,
  savedActivities
});

export const signIn = (userToken, userData) => ({
  type: actionTypes.SIGN_IN,
  userToken,
  userData
})

export const signOut = () => ({
  type: actionTypes.SIGN_OUT
})

export const saveActivities = (savedActivities) => ({
  type: actionTypes.SAVE_ACTIVITIES,
  savedActivities
})

export const deleteActivityById = (savedActivities) => ({
  type: actionTypes.DELETE_ACTIVITY,
  savedActivities
})