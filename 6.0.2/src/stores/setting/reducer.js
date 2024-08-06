import * as types from './types.js';

const initialState = {
  emailConfig: null, // Initial state for email configuration
};

/**
 * Reducer function for settings.
 * @param {Object} state - The current state.
 * @param {Object} action - The action dispatched.
 * @returns {Object} - The new state after the action is applied.
 */
export default function settingReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.FETCH_MAIL_CONFIG_SUCCESS:
      return {...state, emailConfig: payload}; // Update emailConfig on success

    default:
      return state; // Return current state for unhandled actions
  }
}
