import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const noteStore = (state) => state?.note;

/**
 * Selector for retrieving formatted notes.
 * @returns {Array<{title: string, rightTitle: string, fullItem: Object}>} - The formatted notes.
 */
export const notesSelector = createSelector(noteStore, (store) => {
  if (isEmpty(store?.notes)) return [];
  return store.notes.map((note) => ({
    title: note.name,
    rightTitle: note.type,
    fullItem: note,
  }));
});

/**
 * Selector for retrieving note types.
 * @param {Array} notes - The array of notes.
 * @returns {Array<{title: string, fullItem: Object}>} - The note types.
 */
export const notesTypeSelector = (notes) => {
  if (isEmpty(notes)) return [];
  return notes.map((note) => ({
    title: note.title,
    fullItem: note.fullItem,
  }));
};

/**
 * Selector for loading states.
 * @returns {{isSaving: boolean, isDeleting: boolean}} - The loading states.
 */
export const loadingSelector = createSelector(noteStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
}));
