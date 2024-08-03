import {all, takeEvery, select} from 'redux-saga/effects';
import {REHYDRATE} from 'redux-persist/src/constants';

// Import individual sagas
import auth from 'stores/auth/saga';
import invoice from 'stores/invoice/saga';
import estimate from 'stores/estimate/saga';
import customer from 'stores/customer/saga';
import expense from 'stores/expense/saga';
import payment from 'stores/payment/saga';
import setting from 'stores/setting/saga';
import company from 'stores/company/saga';
import role from 'stores/role/saga';
import users from 'stores/users/saga';
import user from 'stores/user/saga';
import paymentMode from 'stores/payment-mode/saga';
import itemUnit from 'stores/item-unit/saga';
import common from 'stores/common/saga';
import recurringInvoice from 'stores/recurring-invoice/saga';
import category from 'stores/category/saga';
import item from 'stores/item/saga';
import note from 'stores/note/saga';
import taxType from 'stores/tax-type/saga';
import taxation from 'stores/taxation/saga';
import customField from 'stores/custom-field/saga';
import {PermissionService} from '@/services';

/**
 * Root saga that manages the overall saga middleware.
 * It listens for the REHYDRATE action to set permissions and run all sagas.
 * @returns {Generator} A generator function for saga middleware.
 */
export default function* rootSaga() {
  yield takeEvery(REHYDRATE, function* boot() {
    const reduxStore = yield select();
    const userStore = reduxStore?.user;

    // Set user permissions based on the current user state
    PermissionService.setPermissions(
      userStore?.currentAbilities,
      userStore?.currentUser?.is_owner
    );

    // Run all sagas in parallel
    yield all([
      auth(),
      invoice(),
      estimate(),
      customer(),
      expense(),
      payment(),
      setting(),
      company(),
      role(),
      users(),
      user(),
      category(),
      paymentMode(),
      itemUnit(),
      recurringInvoice(),
      item(),
      common(),
      note(),
      taxType(),
      taxation(),
      customField(),
    ]);
  });
}
