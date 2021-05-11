export const actionTypes = {
  RESTORE_TOKEN: 'RESTORE_TOKEN',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SAVE_ACTIVITIES: 'SAVE_ACTIVITIES'
};

export const restoreToken = (userToken, userData, savedActivities) => ({
  type: actionTypes.RESTORE_TOKEN,
  userToken,
  userData,
  savedActivities
});

export const signIn = () => ({
  type: actionTypes.SIGN_IN
})

export const signOut = () => ({
  type: actionTypes.SIGN_OUT
})

export const saveActivities = () => ({
  type: actionTypes.SAVE_ACTIVITIES
})