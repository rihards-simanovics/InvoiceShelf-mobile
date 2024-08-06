import {call, put, takeLatest, select} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import t from 'locales/use-translation';
import {handleError} from '@/utils';
import {hasObjectLength} from '@/constants';

/**
 * Saga to fetch mail configuration.
 * @param {Object} action - The action containing the payload.
 * @returns {IterableIterator<*>} - The generator function for saga.
 */
function* fetchMailConfig({payload}) {
  try {
    const state = yield select(); // Get the current state
    const emailConfig = state.setting?.emailConfig; // Access emailConfig from state

    // If emailConfig already exists, return it via the payload callback
    if (hasObjectLength(emailConfig)) {
      payload?.(emailConfig);
      return;
    }

    // Fetch mail configuration from the service
    const response = yield call(req.fetchMailConfig);
    yield put({type: types.FETCH_MAIL_CONFIG_SUCCESS, payload: response});
    payload?.(response); // Return the fetched response via the payload callback
  } catch (e) {
    handleError(e); // Handle any errors that occur during the fetch
  }
}

/**
 * Root saga for settings.
 * @returns {IterableIterator<*>} - The generator function for saga.
 */
export default function* settingSaga() {
  yield takeLatest(types.FETCH_MAIL_CONFIG, fetchMailConfig); // Watch for FETCH_MAIL_CONFIG actions
}
