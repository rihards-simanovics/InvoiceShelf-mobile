import * as types from './types';

// Initial state for the category reducer
const initialState = {
  categories: [], // List of categories
  isSaving: false, // Saving state
  isDeleting: false, // Deleting state
};

/**
 * Category reducer to manage category-related state.
 * @param {Object} state - The current state.
 * @param {Object} action - The action dispatched.
 * @returns {Object} The new state after applying the action.
 */
export default function categoryReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_CATEGORIES_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          categories: payload.categories,
          isSaving: false,
          isDeleting: false,
        };
      }
      return {
        ...state,
        categories: [...state.categories, ...payload.categories],
      };

    case types.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [payload, ...state.categories],
      };

    case types.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === payload.id ? payload : category
        ),
      };

    case types.REMOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(({id}) => id !== payload),
      };

    default:
      return state;
  }
}
