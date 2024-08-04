import {call, put, takeEvery} from 'redux-saga/effects';
import t from 'locales/use-translation';
import * as req from './service';
import {spinner} from './actions';
import * as types from './types';
import {showNotification, handleError} from '@/utils';

/**
 * Saga for fetching payment modes.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} The generator function.
 */
export function* fetchPaymentModes({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchPaymentModes, queryString);
    yield put({
      type: types.FETCH_PAYMENT_MODES_SUCCESS,
      payload: {modes: response.data, fresh},
    });
    onSuccess?.(response);
  } catch (e) {
    handleError(e);
    onFail?.();
  }
}

/**
 * Saga for adding a payment mode.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} The generator function.
 */
function* addPaymentMode({payload}) {
  const {params, onSuccess, onFail} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addPaymentMode, params);
    yield put({type: types.ADD_PAYMENT_MODE_SUCCESS, payload: data});
    onSuccess?.();
    showNotification({message: t('notification.payment_mode_created')});
  } catch (e) {
    handleError(e);
    onFail?.();
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga for updating a payment mode.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} The generator function.
 */
function* updatePaymentMode({payload}) {
  const {params, onSuccess, onFail} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updatePaymentMode, params);
    yield put({type: types.UPDATE_PAYMENT_MODE_SUCCESS, payload: data});
    onSuccess?.();
    showNotification({message: t('notification.payment_mode_updated')});
  } catch (e) {
    handleError(e);
    onFail?.();
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga for removing a payment mode.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>} The generator function.
 */
function* removePaymentMode({payload}) {
  const {id, onSuccess, onFail} = payload;
  try {
    yield put(spinner('isDeleting', true));
    yield call(req.removePaymentMode, id);
    yield put({type: types.REMOVE_PAYMENT_MODE_SUCCESS, payload: id});
    onSuccess?.();
    showNotification({message: t('notification.payment_mode_deleted')});
  } catch (e) {
    handleError(e);
    onFail?.();
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Root saga for payment modes.
 * @returns {IterableIterator<*>} The generator function.
 */
export default function* paymentModeSaga() {
  yield takeEvery(types.FETCH_PAYMENT_MODES, fetchPaymentModes);
  yield takeEvery(types.ADD_PAYMENT_MODE, addPaymentMode);
  yield takeEvery(types.UPDATE_PAYMENT_MODE, updatePaymentMode);
  yield takeEvery(types.REMOVE_PAYMENT_MODE, removePaymentMode);
}
