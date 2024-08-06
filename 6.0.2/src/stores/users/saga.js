import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation} from '@/navigation';
import {fetchCompanies} from '../company/saga';

/**
 * Saga for fetching users.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* fetchUsers({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchUsers, queryString);
    const users = response?.data ?? [];
    yield put({type: types.FETCH_USERS_SUCCESS, payload: {users, fresh}});
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Saga for fetching a single user.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* fetchSingleUser({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleUser, id);
    yield call(fetchCompanies);
    onSuccess?.(data);
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga for adding a user.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* addUser({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addUser, payload.params);
    yield put({type: types.ADD_USER_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.user_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga for updating a user.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* updateUser({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {id, params} = payload;
    const {data} = yield call(req.updateUser, id, params);
    yield put({type: types.UPDATE_USER_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.user_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga for removing a user.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* removeUser({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id} = payload;
    yield call(req.removeUser, id);
    yield put({type: types.REMOVE_USER_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.user_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Saga for fetching initial user details.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* fetchUserInitialDetails({payload}) {
  yield call(fetchCompanies);
  payload?.();
}

/**
 * Root saga for user-related sagas.
 * @returns {IterableIterator<*>} - The generator function.
 */
export default function* usersSaga() {
  yield takeLatest(types.FETCH_USERS, fetchUsers);
  yield takeLatest(types.FETCH_SINGLE_USER, fetchSingleUser);
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchUserInitialDetails);
  yield takeLatest(types.ADD_USER, addUser);
  yield takeLatest(types.UPDATE_USER, updateUser);
  yield takeLatest(types.REMOVE_USER, removeUser);
}
