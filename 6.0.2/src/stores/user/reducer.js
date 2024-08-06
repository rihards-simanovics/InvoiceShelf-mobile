import * as types from './types';

const initialState = {
  currentUser: null, // The currently logged-in user
  currentAbilities: [], // The abilities of the current user
  isSaving: false, // Indicates if a save operation is in progress
};

/**
 * User reducer to manage user-related state.
 * @param {Object} state - The current state of the user.
 * @param {Object} action - The action dispatched.
 * @returns {Object} - The new state after applying the action.
 */
export default function userReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.SET_CURRENT_USER:
      return {...state, currentUser: payload};

    case types.SET_USER_SETTING:
      return {...state, ...payload, isSaving: false};

    default:
      return state;
  }
}
