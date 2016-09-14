import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import { importDeepFiles } from '../utils/imports';

export const rootReducer = (
  combineReducers(importDeepFiles(module, './', 'reducer'))
);

export const rootSaga = function* rootSaga() {
  const sagas = importDeepFiles(module, './', 'saga');
  for (const saga of Object.values(sagas)) {
    yield fork(saga);
  }
};
