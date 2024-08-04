import {call, put, takeLatest} from 'redux-saga/effects';
import {fetchCustomFields} from 'stores/custom-field/saga';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {modalTypes} from '../custom-field/helpers';
import {navigation} from '@/navigation';
import {fetchCurrencies} from '../company/saga';

/**
 * Saga for fetching expense templates.
 * @returns {IterableIterator<*>}
 */
function* fetchExpenseData() {
  try {
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.EXPENSE, limit: 'all'}},
    });
    yield call(fetchCurrencies);
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga for fetching initial details of a recurring expense.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>}
 */
function* fetchExpenseInitialDetails({payload}) {
  yield call(fetchExpenseData);
  payload?.();
}

/**
 * Saga for fetching expenses.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>}
 */
function* fetchExpenses({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchExpenses, queryString);
    const expenses = response?.data ?? [];
    yield put({
      type: types.FETCH_EXPENSES_SUCCESS,
      payload: {expenses, fresh},
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Saga for fetching a single expense.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>}
 */
function* fetchSingleExpense({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleExpense, id);
    yield call(fetchExpenseData);
    onSuccess?.(data);
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga for adding an expense.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>}
 */
function* addExpense({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {params, attachmentReceipt} = payload;
    const {data} = yield call(req.addExpense, params);
    if (attachmentReceipt && data?.id) {
      yield call(
        req.uploadAttachmentReceipt,
        data.id,
        attachmentReceipt,
        'create'
      );
    }
    yield put({type: types.ADD_EXPENSE_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.expense_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga for updating an expense.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>}
 */
function* updateExpense({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {params, id, attachmentReceipt} = payload;
    const {data} = yield call(req.updateExpense, id, params);
    if (attachmentReceipt) {
      yield call(req.uploadAttachmentReceipt, id, attachmentReceipt, 'edit');
    }
    yield put({type: types.UPDATE_EXPENSE_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.expense_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Saga for removing an expense.
 * @param {Object} action - The action dispatched.
 * @returns {IterableIterator<*>}
 */
function* removeExpense({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id, navigation} = payload;
    yield call(req.removeExpense, id);
    yield put({type: types.REMOVE_EXPENSE_SUCCESS, payload: id});
    navigation.goBack(null);
    showNotification({message: t('notification.expense_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Root saga for expense-related actions.
 * @returns {IterableIterator<*>}
 */
export default function* expenseSaga() {
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchExpenseInitialDetails);
  yield takeLatest(types.FETCH_EXPENSES, fetchExpenses);
  yield takeLatest(types.FETCH_SINGLE_EXPENSE, fetchSingleExpense);
  yield takeLatest(types.ADD_EXPENSE, addExpense);
  yield takeLatest(types.UPDATE_EXPENSE, updateExpense);
  yield takeLatest(types.REMOVE_EXPENSE, removeExpense);
}
