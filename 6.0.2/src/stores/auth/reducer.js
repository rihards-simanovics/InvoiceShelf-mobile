import * as types from './types';

// Initial state for the auth reducer
const initialState = {
  idToken: null, // User ID token
  isLogin: false, // Login status
};

/**
 * Auth reducer to manage authentication state.
 * @param {Object} state - The current state.
 * @param {Object} action - The action dispatched.
 * @returns {Object} The new state after applying the action.
 */
export default function authReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.LOGIN_SUCCESS:
      return {...state, isLogin: true};

    case types.LOGOUT_SUCCESS:
      return {...state, isLogin: false};

    case types.PING_SUCCESS:
      return {...state, isLogin: false};

    case types.SAVE_ID_TOKEN:
      return {...state, idToken: payload};

    default:
      return state;
  }
}
