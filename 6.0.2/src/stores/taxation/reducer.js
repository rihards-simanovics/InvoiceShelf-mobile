import * as types from './types';

const initialState = {
  isSaving: false,
};

/**
 * Reducer function for managing tax type state.
 * @param {Object} state - The current state of the reducer.
 * @param {Object} action - The action dispatched to the reducer.
 * @returns {Object} - The new state after applying the action.
 */
export default function taxTypeReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    default:
      return state;
  }
}
