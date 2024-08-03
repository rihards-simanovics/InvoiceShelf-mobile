import {applyMiddleware, createStore} from 'redux';
import rootReducer from 'stores/root-reducer';
import * as reduxStorage from 'redux-storage';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import saga from 'stores/root-saga';

/**
 * Configuration for Redux Persist.
 * @type {Object}
 * @property {string} key - The key for the persisted state.
 * @property {Object} storage - The storage engine to use.
 * @property {Array<string>} whitelist - Reducers to persist.
 * @property {Array<string>} blackList - Reducers to not persist.
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'common', 'company', 'user'],
  blackList: ['form'],
};

// Create a reducer that integrates redux-storage with the root reducer
const reducer = reduxStorage.reducer(rootReducer);

// Create a persisted reducer using the persist configuration
const persistedReducer = persistReducer(persistConfig, reducer);

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with the persisted reducer and middleware
export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

// Create a persistor for the store
export const persistor = persistStore(store);

// Run the root saga
sagaMiddleware.run(saga);
