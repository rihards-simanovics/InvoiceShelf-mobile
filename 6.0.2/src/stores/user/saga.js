import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {setCurrentUser, spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation} from '@/navigation';

/**
 * Saga to fetch the current user.
 * @param {Object} action - The action containing the payload.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* fetchCurrentUser({payload}) {
  try {
    const {data} = yield call(req.fetchCurrentUser);
    const {language} = yield call(req.fetchUserSettings, ['language']);
    yield put(setCurrentUser(data));
    payload?.({...data, language});
    yield put(spinner('isSaving', false));
  } catch (e) {
    // Handle error if necessary
  }
}

/**
 * Saga to update the current user.
 * @param {Object} action - The action containing the payload.
 * @returns {IterableIterator<*>} - The generator function.
 */
function* updateCurrentUser({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {params, avatar} = payload;
    const {data} = yield call(req.updateCurrentUser, params);
    yield put(setCurrentUser(data));
    yield call(req.updateUserSettings, {language: params.language});

    // Upload avatar if provided
    if (avatar) {
      yield call(req.uploadAvatar, avatar);
    }

    navigation.goBack();
    showNotification({message: t('notification.account_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Root saga for user-related sagas.
 * @returns {IterableIterator<*>} - The generator function.
 */
export default function* userSaga() {
  yield takeLatest(types.FETCH_CURRENT_USER, fetchCurrentUser);
  yield takeLatest(types.UPDATE_CURRENT_USER, updateCurrentUser);
}
