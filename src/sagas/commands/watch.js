import qs from 'qs';
import { call, put, take } from 'redux-saga/effects';
import { parse as parseUrl } from 'url';

import watchersActions from '../../modules/watchers/actions';
import { AddUrl, NeverMind, UrlParsingError }
  from '../../templates/watcher';

import { randomReadableId } from '../../utils/random';

export default function* (session, args) {
  const { bot, chat, updates } = session;
  let [ url ] = args;
  if (!url) {
    yield call([bot, bot.sendMessage], chat.id, AddUrl);
    url = (yield take(updates)).text;
  }
  if (!url) {
    yield call([bot, bot.sendMessage], chat.id, NeverMind);
    return;
  }

  let options = null;

  try {
    const parsedUrl = parseUrl(url);
    options = {
      ...qs.parse(parsedUrl.query),
      ...qs.parse(parsedUrl.hash.slice(1)),
    };
  } catch (e) {
    yield call([bot, bot.sendMessage], chat.id, UrlParsingError);
    return;
  }

  yield put(watchersActions.startWatcher(
    randomReadableId(), session, url, options
  ));
}
