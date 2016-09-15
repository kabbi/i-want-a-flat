import { put } from 'redux-saga/effects';

import watchersActions from '../../modules/watchers/actions';

export default function* (session, args) {
  const [ watcherId ] = args;
  // TODO: Check watcher existence and report errors
  yield put(watchersActions.stopWatcher(watcherId));
}
