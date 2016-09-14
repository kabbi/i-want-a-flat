import { call, select } from 'redux-saga/effects';

import * as watcherSelectors from '../../modules/watchers/selectors';
import { makeStatus } from '../../templates/watcher';

export default function* (session) {
  const { bot, chat } = session;

  const watchers = yield select(watcherSelectors.getAllWatchers);
  yield call([bot, bot.sendMessage], chat.id, makeStatus(watchers), {
    parse_mode: 'Markdown',
  });
}
