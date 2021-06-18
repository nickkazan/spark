import { actionTypes } from './actions';


export const initialState = {
  isSignedIn: false,
  userToken: null,
  userData: null,
  colorMode: "DEFAULT",
  savedActivities: [],
  profilePicture: null
};

export const stateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.RESTORE_TOKEN:
      return {
        ...state,
        isSignedIn: action.isSignedIn,
        userToken: action.userToken,
        userData: action.userData,
        savedActivities: action.savedActivities,
        colorMode: action.colorMode,
        profilePicture: action.profilePicture
      };
    case actionTypes.CHANGE_THEME:
      return {
        ...state,
        colorMode: action.colorMode
      }
    case actionTypes.CHANGE_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.profilePicture
      }
    case actionTypes.SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userToken: action.userToken,
        userData: action.userData,
        savedActivities: action.savedActivities
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userToken: null,
        userData: null,
        savedActivities: [],
        profilePicture: action.profilePicture
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
