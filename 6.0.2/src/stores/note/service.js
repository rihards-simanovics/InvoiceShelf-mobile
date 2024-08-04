import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch notes from the server.
 * @param {Object} q - The query parameters for fetching notes.
 * @returns {Promise<*>} - The promise resolving to the response.
 */
export const fetchNotes = (q) => {
  return Request.get(`/notes?${queryString.stringify(q)}`);
};

/**
 * Fetch a single note by ID.
 * @param {string} id - The ID of the note to fetch.
 * @returns {Promise<*>} - The promise resolving to the response.
 */
export const fetchSingleNote = (id) => {
  return Request.get(`/notes/${id}`);
};

/**
 * Add a new note.
 * @param {Object} data - The data for the new note.
 * @returns {Promise<*>} - The promise resolving to the response.
 */
export const addNote = (data) => {
  return Request.post(`/notes`, data);
};

/**
 * Update an existing note by ID.
 * @param {string} id - The ID of the note to update.
 * @param {Object} data - The updated data for the note.
 * @returns {Promise<*>} - The promise resolving to the response.
 */
export const updateNote = (id, data) => {
  return Request.put(`/notes/${id}`, data);
};

/**
 * Remove a note by ID.
 * @param {string} id - The ID of the note to remove.
 * @returns {Promise<*>} - The promise resolving to the response.
 */
export const removeNote = (id) => {
  return Request.delete(`/notes/${id}`);
};
