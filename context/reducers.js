import { actionTypes } from './actions';


export const initialState = {
  isSignedIn: false,
  userToken: null,
  userData: null,
  colorMode: "DEFAULT",
  savedActivities: []
};

export const stateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.RESTORE_TOKEN:
      return {
        ...state,
        isSignedIn: true,
        userToken: action.userToken,
        userData: action.userData,
        savedActivities: action.savedActivities,
        colorMode: action.colorMode
      };
    case actionTypes.CHANGE_THEME:
      return {
        ...state,
        colorMode: action.colorMode
      }
    case actionTypes.SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userToken: action.userToken,
        userData: action.userData,
        // savedActivities: action.savedActivities
        // At some point, this will need to be persistent across logins
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userToken: null,
        userData: null,
        savedActivities: null,
      };
    case actionTypes.SAVE_ACTIVITIES:
      return {
        ...state,
        savedActivities: action.savedActivities
      };
    case actionTypes.DELETE_ACTIVITY:
      return {
        ...state,
        savedActivities: action.savedActivities
      }
    default:
      return state;
  }
};
