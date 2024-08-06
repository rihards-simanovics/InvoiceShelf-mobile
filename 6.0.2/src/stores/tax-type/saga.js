import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation} from '@/navigation';

/**
 * Saga to fetch taxes.
 * @param {Object} action - The action containing the payload.
 * @returns {IterableIterator<*>} - The generator function for saga.
 */
function* fetchTaxes({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchTaxes, queryString);
    yield put({
      type: types.FETCH_TAXES_SUCCESS,
      payload: {taxTypes: response?.data, fresh},
    });
    onSuccess?.(response); // Call onSuccess callback if provided
  } catch (e) {
    onFail?.(); // Call onFail callback if provided
  }
}

/**
 * Saga to fetch a single tax by ID.
 * @param {Object} action - The action containing the payload.
 * @returns {IterableIterator<*>} - The generator function for saga.
 */
function* fetchSingleTax({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleTax, id);
    onSuccess?.(data); // Call onSuccess callback if provided
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga to add a new tax.
 * @param {Object} action - The action containing the payload.
 * @returns {IterableIterator<*>} - The generator function for saga.
 */
function* addTax({payload}) {
  try {
    const {params, onSuccess} = payload;
    yield put(spinner('isSaving', true)); // Show saving spinner
    const {data} = yield call(req.addTax, params);
    yield put({type: types.ADD_TAX_SUCCESS, payload: data});
    onSuccess?.(data); // Call onSuccess callback if provided
    showNotification({message: t('notification.tax_created')}); // Show success notification
  } catch (e) {
    handleError(e); // Handle any errors
  } finally {
    yield put(spinner('isSaving', false)); // Hide saving spinner
  }
}

/**
 * Saga to update an existing tax.
 * @param {Object} action - The action containing the payload.
 * @returns {IterableIterator<*>} - The generator function for saga.
 */
function* updateTax({payload}) {
  const {id, params} = payload;
  try {
    yield put(spinner('isSaving', true)); // Show saving spinner
    const {data} = yield call(req.updateTax, id, params);
    yield put({type: types.UPDATE_TAX_SUCCESS, payload: data});
    navigation.goBack(); // Navigate back after update
    showNotification({message: t('notification.tax_updated')}); // Show success notification
  } catch (e) {
    handleError(e); // Handle any errors
  } finally {
    yield put(spinner('isSaving', false)); // Hide saving spinner
  }
}

/**
 * Saga to remove a tax by ID.
 * @param {Object} action - The action containing the payload.
 * @returns {IterableIterator<*>} - The generator function for saga.
 */
function* removeTax({payload}) {
  try {
    const {id} = payload;
    yield put(spinner('isDeleting', true)); // Show deleting spinner
    yield call(req.removeTax, id);
    yield put({type: types.REMOVE_TAX_SUCCESS, payload: id});
    navigation.goBack(); // Navigate back after deletion
    showNotification({message: t('notification.tax_deleted')}); // Show success notification
  } catch (e) {
    handleError(e); // Handle any errors
  } finally {
    yield put(spinner('isDeleting', false)); // Hide deleting spinner
  }
}

/**
 * Root saga for tax type actions.
 * @returns {IterableIterator<*>} - The generator function for saga.
 */
export default function* taxTypeSaga() {
  yield takeLatest(types.FETCH_TAXES, fetchTaxes);
  yield takeLatest(types.FETCH_SINGLE_TAX, fetchSingleTax);
  yield takeLatest(types.ADD_TAX, addTax);
  yield takeLatest(types.UPDATE_TAX, updateTax);
  yield takeLatest(types.REMOVE_TAX, removeTax);
}
