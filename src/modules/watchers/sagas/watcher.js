import { call, put, select } from 'redux-saga/effects';

import * as Templates from '../../../templates/watcher';

import { fetchApartments } from '../../../utils/onliner';
import { delay } from '../../../utils/promise';

import actions from '../actions';
import * as selectors from '../selectors';

export default function* (watcherId) {
  const { session, options } = yield select(selectors.getWatcherById, watcherId);
  const { bot, chat } = session;

  yield put(actions.updateWatcherData(watcherId, {
    startTime: Date.now(),
    knownApartments: {},
    stats: {
      uniqueApartmentCount: 0,
      iterationCount: 0,
      successCount: 0,
      errorCount: 0,
    },
  }));

  yield call([bot, bot.sendMessage], chat.id, Templates.makeWatcherStarted(watcherId), {
    parse_mode: 'Markdown',
  });

  while (true) {
    const { knownApartments, stats } = yield select(selectors.getWatcherById, watcherId);
    const newKnownApartments = { ...knownApartments };
    const newStats = { ...stats };
    newStats.iterationCount++;

    try {
      const localCache = {};
      const { apartments } = yield call(fetchApartments, {
        ...options,
        // TODO: Implement pagination
        page: 1,
      });

      const updates = {
        haveAdded: false,
        hasRemoved: false,
        added: {},
        removed: {},
      };

      for (const ap of apartments) {
        localCache[ap.id] = ap;
        if (knownApartments[ap.id]) {
          continue;
        }
        updates.haveAdded = true;
        updates.added[ap.id] = ap;
        newKnownApartments[ap.id] = ap;
      }
      for (const key of Object.keys(knownApartments)) {
        const ap = knownApartments[key];
        if (localCache[ap.id]) {
          continue;
        }
        updates.haveRemoved = true;
        updates.removed[ap.id] = ap;
        delete newKnownApartments[ap.id];
      }

      if (updates.haveAdded || updates.haveRemoved) {
        yield call([bot, bot.sendMessage], chat.id, Templates.makeUpdate(updates), {
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        });
      }

      newStats.successCount++;
      yield put(actions.updateWatcherData(watcherId, {
        knownApartments: newKnownApartments,
        stats: newStats,
      }));

      yield call(delay, 6e5 * Math.random() * 5);
    } catch (error) {
      console.log('e', error);
      yield call([bot, bot.sendMessage], chat.id, Templates.makeUpdateError(watcherId), {
        parse_mode: 'Markdown',
      });

      newStats.errorCount++;
      yield put(actions.updateWatcherData(watcherId, {
        stats: newStats,
      }));

      yield call(delay, 6e5 * Math.random() * 5);
    }
  }
}
