import * as types from './types';

const initialState = {
  taxTypes: [], // List of tax types
  isSaving: false, // Indicates if a tax is being saved
  isDeleting: false, // Indicates if a tax is being deleted
};

/**
 * Reducer function for managing tax types state.
 * @param {Object} state - The current state.
 * @param {Object} action - The action dispatched.
 * @returns {Object} - The new state after the action is applied.
 */
export default function taxTypeReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value}; // Update spinner state

    case types.FETCH_TAXES_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          taxTypes: payload.taxTypes, // Replace taxTypes with fresh data
          isSaving: false,
          isDeleting: false,
        };
      }
      return {
        ...state,
        taxTypes: [...state.taxTypes, ...payload.taxTypes], // Append new taxTypes
      };

    case types.ADD_TAX_SUCCESS:
      return {...state, taxTypes: [payload, ...state.taxTypes]}; // Add new tax to the list

    case types.UPDATE_TAX_SUCCESS:
      return {
        ...state,
        taxTypes: state.taxTypes.map(
          (tax) => (tax.id === payload.id ? payload : tax) // Update the specific tax
        ),
      };

    case types.REMOVE_TAX_SUCCESS:
      return {
        ...state,
        taxTypes: state.taxTypes.filter(({id}) => id !== payload), // Remove the tax by ID
      };

    default:
      return state; // Return current state for unhandled actions
  }
}
