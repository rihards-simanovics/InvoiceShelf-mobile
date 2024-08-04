import * as types from './types';

// Initial state for the estimate reducer
const initialState = {
  estimates: [], // Array to hold estimates
  isFetchingInitialData: false, // Flag for fetching initial data
  isLoading: false, // Flag for loading state
  isDeleting: false, // Flag for deleting state
  isSaving: false, // Flag for saving state
  estimateTemplates: [], // Array to hold estimate templates
  selectedItems: [], // Array to hold selected items
};

/**
 * Reducer function for managing estimate state.
 * @param {Object} state - The current state of the estimates.
 * @param {Object} action - The action dispatched to the reducer.
 * @returns {Object} - The new state after applying the action.
 */
export default function estimateReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_ESTIMATES_SUCCESS:
      // Update estimates based on fresh flag
      if (payload.fresh) {
        return {...state, estimates: payload.estimates};
      }
      return {...state, estimates: [...state.estimates, ...payload.estimates]};

    case types.FETCH_ESTIMATE_TEMPLATES_SUCCESS:
      return {...state, estimateTemplates: payload};

    case types.ADD_ESTIMATE_SUCCESS:
      return {...state, estimates: [payload, ...state.estimates]};

    case types.UPDATE_ESTIMATE_SUCCESS:
      return {
        ...state,
        estimates: state.estimates.map((estimate) =>
          estimate.id === payload.id ? payload : estimate
        ),
      };

    case types.REMOVE_ESTIMATE_SUCCESS:
      return {
        ...state,
        estimates: state.estimates.filter(({id}) => id !== payload),
      };

    case types.ADD_ESTIMATE_ITEM_SUCCESS:
      return {...state, selectedItems: [...state.selectedItems, ...payload]};

    case types.REMOVE_ESTIMATE_ITEM_SUCCESS:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(({id}) => id !== payload),
      };

    case types.CLEAR_ESTIMATE:
      return {
        ...state,
        selectedItems: [],
        isFetchingInitialData: false,
        isLoading: false,
        isDeleting: false,
        isSaving: false,
      };

    default:
      return state;
  }
}
