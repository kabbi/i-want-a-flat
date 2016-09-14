import { fork, race, take } from 'redux-saga/effects';

import actions from './actions';
import watcher from './sagas/watcher';

export default function* () {
  const watcherTasksById = {};
  while (true) {
    const { start, stop } = yield race({
      start: take(actions.startWatcher.toString()),
      stop: take(actions.stopWatcher.toString()),
    });
    const { payload: { id } } = start || stop;
    const watcherTask = watcherTasksById[id];
    if (start && !watcherTask) {
      watcherTasksById[id] = yield fork(watcher, id);
    }
    if (stop && watcherTask) {
      watcherTask.cancel();
      delete watcherTasksById[id];
    }
  }
}
