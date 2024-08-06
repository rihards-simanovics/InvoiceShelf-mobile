import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation} from '@/navigation';

/**
 * Saga to fetch roles.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} The generator function.
 */
function* fetchRoles({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchRoles, queryString);
    const roles = response?.data ?? [];
    yield put({type: types.FETCH_ROLES_SUCCESS, payload: {roles, fresh}});
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Saga to fetch a single role.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} The generator function.
 */
function* fetchSingleRole({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleRole, id);
    const {abilities: permissions} = yield call(req.fetchPermissions);
    yield put({
      type: types.FETCH_SINGLE_ROLE_SUCCESS,
      payload: {permissions, currentPermissions: data?.abilities ?? []},
    });
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Saga to fetch permissions.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} The generator function.
 */
function* fetchPermissions({payload}) {
  try {
    const response = yield call(req.fetchPermissions);
    yield put({
      type: types.FETCH_PERMISSIONS_SUCCESS,
      payload: response.abilities ?? [],
    });
    payload?.(response);
  } catch (e) {}
}

/**
 * Saga to add a new role.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} The generator function.
 */
function* addRole({payload}) {
  try {
    const {params, onSuccess} = payload;
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addRole, params);
    yield put({type: types.ADD_ROLE_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.role_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga to update an existing role.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} The generator function.
 */
function* updateRole({payload}) {
  try {
    const {id, params} = payload;
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updateRole, id, params);
    yield put({type: types.UPDATE_ROLE_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.role_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga to remove a role.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} The generator function.
 */
function* removeRole({payload}) {
  const {id} = payload;
  try {
    yield put(spinner('isDeleting', true));
    yield call(req.removeRole, id);
    yield put({type: types.REMOVE_ROLE_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.role_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Root saga for role management.
 * @returns {IterableIterator<*>} The generator function.
 */
export default function* roleSaga() {
  yield takeLatest(types.FETCH_ROLES, fetchRoles);
  yield takeLatest(types.FETCH_SINGLE_ROLE, fetchSingleRole);
  yield takeLatest(types.FETCH_PERMISSIONS, fetchPermissions);
  yield takeLatest(types.ADD_ROLE, addRole);
  yield takeLatest(types.UPDATE_ROLE, updateRole);
  yield takeLatest(types.REMOVE_ROLE, removeRole);
}
