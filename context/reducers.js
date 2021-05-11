import { actionTypes } from './actions';


export const initialState = {
  isSignedIn: false,
  userToken: null,
  userData: null,
  savedActivities: []
};

export const stateReducer = (state, action) => {
  // let userToken, userData, savedActivities
  switch (action.type) {
    case actionTypes.RESTORE_TOKEN:
      return {
        ...state,
        isSignedIn: true,
        userToken: action.userToken,
        userData: action.userData,
        savedActivities: action.savedActivities
      };
    case actionTypes.SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userToken: action.userToken,
        userData: action.userData
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userToken: null,
        userData: null,
        savedActivities: null
      };
    case actionTypes.SAVE_ACTIVITIES:
      return {
        ...state,
        savedActivities: action.savedActivities
      }
    default:
      return state;
  }
};
