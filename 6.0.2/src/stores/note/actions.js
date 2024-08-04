import * as types from './types';

/**
 * Action creator for setting the spinner state.
 * @param {string} name - The name of the spinner.
 * @param {*} value - The value to set for the spinner.
 * @returns {{type: string, payload: {name: string, value: *}}} - The action object.
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value},
  };
}

/**
 * Action creator for fetching notes.
 * @param {Object} payload - The payload for fetching notes.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function fetchNotes(payload = {}) {
  return {
    type: types.FETCH_NOTES,
    payload,
  };
}

/**
 * Action creator for fetching a single note.
 * @param {string} id - The ID of the note to fetch.
 * @param {Function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {id: string, onSuccess: Function}}} - The action object.
 */
export function fetchSingleNote(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_NOTE,
    payload: {id, onSuccess},
  };
}

/**
 * Action creator for fetching initial note details.
 * @param {Object} payload - The payload for fetching initial details.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const fetchNoteInitialDetails = (payload) => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload,
});

/**
 * Action creator for adding a note.
 * @param {Object} payload - The payload for adding a note.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function addNote(payload = {}) {
  return {
    type: types.ADD_NOTE,
    payload,
  };
}

/**
 * Action creator for updating a note.
 * @param {Object} payload - The payload for updating a note.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function updateNote(payload = {}) {
  return {
    type: types.UPDATE_NOTE,
    payload,
  };
}

/**
 * Action creator for removing a note.
 * @param {string} id - The ID of the note to remove.
 * @returns {{type: string, payload: {id: string}}} - The action object.
 */
export function removeNote(id) {
  return {
    type: types.REMOVE_NOTE,
    payload: {id},
  };
}
