import { fork, put, take } from 'redux-saga/effects';
import { channel } from 'redux-saga';

import { WrongChatError } from '../../templates/errors';
import sessionHandler from '../sessions/sagas/sessionHandler';

import actions from './actions';

export default function* telegramSaga() {
  const sessions = {};
  while (true) {
    const action = yield take(actions.telegramEvent.toString());

    const { payload: { from, chat } } = action;
    if (chat.type !== 'private' || !from) {
      yield put(actions.telegramSendMessage(chat.id, WrongChatError));
      continue;
    }

    let session = sessions[from.id];
    if (!session) {
      session = sessions[from.id] = {
        channel: channel(),
        chatId: chat.id,
        user: from,
      };
      yield fork(sessionHandler, session);
    }

    yield put(session.channel, action);
  }
}
