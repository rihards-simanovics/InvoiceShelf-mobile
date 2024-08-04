import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import {routes} from '@/navigation';
import {fetchCustomFields} from 'stores/custom-field/saga';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {fetchTaxAndDiscountPerItem} from 'stores/common/actions';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {FETCH_INVOICES_SUCCESS} from '../invoice/types';
import {addItem} from '../item/saga';
import {modalTypes} from '../custom-field/helpers';
import {isEmpty} from '@/constants';
import {selectedCompanySalesTaxSettingSelector} from '../company/selectors';

/**
 * Saga to fetch estimate templates.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* fetchEstimateTemplates() {
  const state = yield select();
  if (isEmpty(state.estimate?.estimateTemplates)) {
    const {estimateTemplates} = yield call(req.fetchEstimateTemplates);
    yield put({
      type: types.FETCH_ESTIMATE_TEMPLATES_SUCCESS,
      payload: estimateTemplates,
    });
  }
}

/**
 * Saga to fetch initial estimate data.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* fetchEstimateData() {
  try {
    yield put({type: types.CLEAR_ESTIMATE});
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.ESTIMATE, limit: 'all'}},
    });
    yield call(fetchEstimateTemplates);
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga to fetch initial details for an estimate.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* fetchEstimateInitialDetails({payload}) {
  yield call(fetchEstimateData);
  yield put(fetchTaxAndDiscountPerItem());
  const params = {key: 'estimate'};
  const {nextNumber} = yield call(req.fetchNextEstimateNumber, params);
  payload?.(nextNumber);
}

/**
 * Saga to fetch the next estimate number.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* fetchNextEstimateNumber({payload = {}}) {
  try {
    const {userId = null, model_id = null, onSuccess} = payload;
    const params = {key: 'estimate', userId, model_id};
    const {nextNumber} = yield call(req.fetchNextEstimateNumber, params);
    onSuccess?.(nextNumber);
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga to fetch estimates.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* fetchEstimates({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchEstimates, queryString);
    const estimates = response?.data ?? [];
    yield put({
      type: types.FETCH_ESTIMATES_SUCCESS,
      payload: {estimates, fresh},
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Saga to fetch a single estimate.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* fetchSingleEstimate({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleEstimate, id);
    yield call(fetchEstimateData);
    yield put({
      type: types.ADD_ESTIMATE_ITEM_SUCCESS,
      payload: data?.items ?? [],
    });
    onSuccess?.(data);
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga to add a new estimate.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* addEstimate({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {estimate, onSuccess} = payload;
    const salesTaxSettings = yield select(
      selectedCompanySalesTaxSettingSelector
    );
    const params = {...estimate, ...salesTaxSettings};
    const {data} = yield call(req.addEstimate, params);
    yield put({type: types.ADD_ESTIMATE_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.estimate_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga to update an existing estimate.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* updateEstimate({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {estimate, onSuccess} = payload;
    const {data} = yield call(req.updateEstimate, estimate.id, estimate);
    yield put({type: types.UPDATE_ESTIMATE_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.estimate_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga to remove an estimate.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* removeEstimate({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id, navigation} = payload;
    yield call(req.removeEstimate, id);
    yield put({type: types.REMOVE_ESTIMATE_SUCCESS, payload: id});
    navigation.goBack(null);
    showNotification({message: t('notification.estimate_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Saga to add an estimate item.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* addEstimateItem({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {item, onSuccess} = payload;
    const items = yield call(addItem, {payload: {item, returnCallback: true}});
    yield put({type: types.ADD_ESTIMATE_ITEM_SUCCESS, payload: items ?? []});
    onSuccess?.();
  } catch (e) {
    // Handle error if necessary
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga to remove an estimate item.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* removeEstimateItem({payload}) {
  try {
    const {id} = payload;
    yield put(spinner('isDeleting', true));
    yield put({type: types.REMOVE_ESTIMATE_ITEM_SUCCESS, payload: id});
  } catch (e) {
    // Handle error if necessary
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Saga to convert an estimate to an invoice.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* convertToInvoice({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.convertToInvoice, id);
    yield put({type: FETCH_INVOICES_SUCCESS, payload: {invoices: [data]}});
    onSuccess?.();
    showNotification({message: t('notification.invoice_created')});
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga to change the status of an estimate.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* changeEstimateStatus({payload}) {
  try {
    yield put(spinner('isLoading', true));
    const {onSuccess = null, params, action, navigation} = payload;
    yield call(req.changeEstimateStatus, action, params);
    onSuccess?.();
    navigation.navigate(routes.ESTIMATES);
  } catch (e) {
    // Handle error if necessary
  } finally {
    yield put(spinner('isLoading', false));
  }
}

/**
 * Saga to send an estimate.
 * @param {Object} action - The action containing payload.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
function* sendEstimate({payload}) {
  try {
    yield put(spinner('isLoading', true));
    const {id, params, onSuccess} = payload;
    const response = yield call(req.sendEstimate, id, params);
    onSuccess?.(response);
    showNotification({message: t('notification.estimate_sent')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isLoading', false));
  }
}

/**
 * Root saga for estimate-related sagas.
 * @returns {IterableIterator<*>} - Generator function for saga.
 */
export default function* estimateSaga() {
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchEstimateInitialDetails);
  yield takeEvery(types.FETCH_NEXT_ESTIMATE_NUMBER, fetchNextEstimateNumber);
  yield takeLatest(types.FETCH_ESTIMATES, fetchEstimates);
  yield takeLatest(types.FETCH_SINGLE_ESTIMATE, fetchSingleEstimate);
  yield takeLatest(types.ADD_ESTIMATE, addEstimate);
  yield takeLatest(types.UPDATE_ESTIMATE, updateEstimate);
  yield takeLatest(types.REMOVE_ESTIMATE, removeEstimate);
  yield takeLatest(types.ADD_ESTIMATE_ITEM, addEstimateItem);
  yield takeLatest(types.REMOVE_ESTIMATE_ITEM, removeEstimateItem);
  yield takeEvery(types.CONVERT_TO_INVOICE, convertToInvoice);
  yield takeEvery(types.CHANGE_ESTIMATE_STATUS, changeEstimateStatus);
  yield takeEvery(types.SEND_ESTIMATE, sendEstimate);
}
