import { call, put, take } from 'redux-saga/effects';

import { Welcome, Help } from '../../../templates/general';
import { UnknownCommandError, NoCommandError, UnknownMessageTypeError }
  from '../../../templates/errors';

import actions from '../../telegram/actions';

const CommandHandlers = {
  '/start': function* startCommandHandler(chatId) {
    yield put(actions.telegramSendMessage(chatId, Welcome));
  },
  '/help': function* startCommandHandler(chatId) {
    yield put(actions.telegramSendMessage(chatId, Help));
  },
  '/watch': {},
  '/unwatch': {},
  '/stats': {},
  '/ping': {},
  '/restart': {},
};

export default function* sessionHandler(session) {
  const { channel, chatId } = session;

  while (true) {
    const { payload: { text } } = yield take(channel);
    if (!text) {
      yield put(actions.telegramSendMessage(chatId, UnknownMessageTypeError));
      continue;
    }

    if (!text.startsWith('/')) {
      yield put(actions.telegramSendMessage(chatId, NoCommandError));
      continue;
    }

    const [ command, ...args ] = text.split(' ');
    if (!CommandHandlers[command]) {
      yield put(actions.telegramSendMessage(chatId, UnknownCommandError));
      continue;
    }

    yield call(CommandHandlers[command], chatId, args);
  }
}
