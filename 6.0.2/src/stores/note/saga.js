import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation} from '@/navigation';
import {fetchCustomFields} from 'stores/custom-field/saga';

/**
 * Saga for fetching notes.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
export function* fetchNotes({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchNotes, queryString);
    yield put({
      type: types.FETCH_NOTES_SUCCESS,
      payload: {notes: response?.data, fresh},
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Saga for fetching a single note.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* fetchSingleNote({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleNote, id);
    yield call(fetchCustomFields, {payload: {queryString: {limit: 'all'}}});
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Saga for fetching initial note details.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* fetchNoteInitialDetails({payload}) {
  yield call(fetchCustomFields, {payload: {queryString: {limit: 'all'}}});
  payload?.();
}

/**
 * Saga for adding a note.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* addNote({payload}) {
  try {
    const {params, onSuccess} = payload;
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addNote, params);
    yield put({type: types.ADD_NOTE_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.note_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga for updating a note.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* updateNote({payload}) {
  const {id, params} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updateNote, id, params);
    yield put({type: types.UPDATE_NOTE_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.note_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga for removing a note.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* removeNote({payload}) {
  try {
    const {id} = payload;
    yield put(spinner('isDeleting', true));
    yield call(req.removeNote, id);
    yield put({type: types.REMOVE_NOTE_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.note_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Root saga for note-related sagas.
 * @returns {IterableIterator<*>} - The generator function.
 */
export default function* noteSaga() {
  yield takeLatest(types.FETCH_NOTES, fetchNotes);
  yield takeLatest(types.FETCH_SINGLE_NOTE, fetchSingleNote);
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchNoteInitialDetails);
  yield takeLatest(types.ADD_NOTE, addNote);
  yield takeLatest(types.UPDATE_NOTE, updateNote);
  yield takeLatest(types.REMOVE_NOTE, removeNote);
}
