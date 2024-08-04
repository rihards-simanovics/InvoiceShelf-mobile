import {call, put, takeLatest, select} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {fetchTaxAndDiscountPerItem} from '../common/actions';
import {showNotification, handleError} from '@/utils';
import t from 'locales/use-translation';
import {navigation} from '@/navigation';
import {fetchCustomFields} from 'stores/custom-field/saga';
import {addItem} from '../item/saga';
import {modalTypes} from '../custom-field/helpers';
import {isEmpty} from '@/constants';
import {selectedCompanySalesTaxSettingSelector} from '../company/selectors';

/**
 * Saga for fetching the next invoice date.
 * @param {Object} payload - The action payload.
 * @returns {Generator} - The generator function.
 */
function* fetchNextInvoiceAt({payload}) {
  try {
    const {params, onSuccess} = payload;
    const response = yield call(req.fetchNextInvoiceAt, params);
    onSuccess?.(response);
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga for fetching invoice templates.
 * @returns {Generator} - The generator function.
 */
function* fetchInvoiceTemplates() {
  const state = yield select();
  if (isEmpty(state.recurringInvoice?.invoiceTemplates)) {
    const {invoiceTemplates} = yield call(req.fetchInvoiceTemplates);
    yield put({
      type: types.FETCH_INVOICE_TEMPLATES_SUCCESS,
      payload: invoiceTemplates,
    });
  }
}

/**
 * Saga for fetching common details of recurring invoices.
 * @returns {Generator} - The generator function.
 */
function* fetchRecurringInvoiceData() {
  try {
    yield put({type: types.CLEAR_RECURRING_INVOICE});
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.INVOICE, limit: 'all'}},
    });
    yield call(fetchInvoiceTemplates);
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga for fetching initial details of a recurring invoice.
 * @param {Object} payload - The action payload.
 * @returns {Generator} - The generator function.
 */
function* fetchRecurringInvoiceInitialDetails({payload}) {
  yield call(fetchRecurringInvoiceData);
  yield put(fetchTaxAndDiscountPerItem());
  payload?.();
}

/**
 * Saga for fetching recurring invoices.
 * @param {Object} payload - The action payload.
 * @returns {Generator} - The generator function.
 */
function* fetchRecurringInvoices({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchRecurringInvoices, queryString);
    const invoices = response?.data ?? [];
    yield put({
      type: types.FETCH_RECURRING_INVOICES_SUCCESS,
      payload: {invoices, fresh},
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Saga for fetching a single recurring invoice.
 * @param {Object} payload - The action payload.
 * @returns {Generator} - The generator function.
 */
function* fetchSingleRecurringInvoice({payload}) {
  try {
    const {id, onSuccess} = payload;
    const response = yield call(req.fetchSingleRecurringInvoice, id);
    const recurringInvoice = response?.data;
    yield call(fetchRecurringInvoiceData);
    yield put({
      type: types.ADD_RECURRING_INVOICE_ITEM_SUCCESS,
      payload: recurringInvoice?.items ?? [],
    });
    onSuccess?.(response?.data);
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga for adding a recurring invoice.
 * @param {Object} payload - The action payload.
 * @returns {Generator} - The generator function.
 */
function* addRecurringInvoice({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {invoice, onSuccess} = payload;
    const salesTaxSettings = yield select(
      selectedCompanySalesTaxSettingSelector
    );
    const params = {...invoice, ...salesTaxSettings};
    const response = yield call(req.addRecurringInvoice, params);
    yield put({
      type: types.ADD_RECURRING_INVOICE_SUCCESS,
      payload: response?.data,
    });
    onSuccess?.(response?.data);
    showNotification({message: t('notification.recurring_invoice_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga for updating a recurring invoice.
 * @param {Object} payload - The action payload.
 * @returns {Generator} - The generator function.
 */
function* updateRecurringInvoice({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {invoice, onSuccess} = payload;
    const response = yield call(
      req.updateRecurringInvoice,
      invoice.id,
      invoice
    );
    yield put({
      type: types.UPDATE_RECURRING_INVOICE_SUCCESS,
      payload: response?.data,
    });
    onSuccess?.(response?.data);
    showNotification({message: t('notification.recurring_invoice_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga for removing a recurring invoice.
 * @param {Object} payload - The action payload.
 * @returns {Generator} - The generator function.
 */
function* removeRecurringInvoice({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id} = payload;
    yield call(req.removeRecurringInvoice, id);
    yield put({type: types.REMOVE_RECURRING_INVOICE_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.recurring_invoice_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Saga for adding an item to a recurring invoice.
 * @param {Object} payload - The action payload.
 * @returns {Generator} - The generator function.
 */
function* addRecurringInvoiceItem({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {item, onSuccess} = payload;
    const items = yield call(addItem, {payload: {item, returnCallback: true}});
    yield put({
      type: types.ADD_RECURRING_INVOICE_ITEM_SUCCESS,
      payload: items ?? [],
    });
    onSuccess?.();
  } catch (e) {
    // Handle error if necessary
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga for removing an item from a recurring invoice.
 * @param {Object} payload - The action payload.
 * @returns {Generator} - The generator function.
 */
function* removeRecurringInvoiceItem({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {onResult, id} = payload;
    yield put({type: types.REMOVE_RECURRING_INVOICE_ITEM_SUCCESS, payload: id});
    onResult?.();
  } catch (e) {
    // Handle error if necessary
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Root saga for recurring invoice actions.
 * @returns {Generator} - The generator function.
 */
export default function* recurringInvoiceSaga() {
  yield takeLatest(types.FETCH_NEXT_INVOICE_AT, fetchNextInvoiceAt);
  yield takeLatest(
    types.FETCH_INITIAL_DETAILS,
    fetchRecurringInvoiceInitialDetails
  );
  yield takeLatest(types.FETCH_RECURRING_INVOICES, fetchRecurringInvoices);
  yield takeLatest(
    types.FETCH_SINGLE_RECURRING_INVOICE,
    fetchSingleRecurringInvoice
  );
  yield takeLatest(types.ADD_RECURRING_INVOICE, addRecurringInvoice);
  yield takeLatest(types.UPDATE_RECURRING_INVOICE, updateRecurringInvoice);
  yield takeLatest(types.REMOVE_RECURRING_INVOICE, removeRecurringInvoice);
  yield takeLatest(types.ADD_RECURRING_INVOICE_ITEM, addRecurringInvoiceItem);
  yield takeLatest(
    types.REMOVE_RECURRING_INVOICE_ITEM,
    removeRecurringInvoiceItem
  );
}
