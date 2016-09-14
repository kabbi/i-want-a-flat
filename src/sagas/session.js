import { call, take } from 'redux-saga/effects';
import requireDirectory from 'require-directory';

import { NoCommandError, UnknownCommandError, UnknownMessageTypeError } from '../templates/errors';

const CommandHandlers = requireDirectory(module, './commands', {
  visit: m => m.default,
  recurse: false,
});

export default function* (session) {
  const { bot, chat, updates } = session;
  console.log('New session created for', chat.id);

  while (true) {
    const { text } = yield take(updates);
    if (!text) {
      yield call([bot, bot.sendMessage], chat.id, UnknownMessageTypeError);
      continue;
    }
    if (!text.startsWith('/')) {
      yield call([bot, bot.sendMessage], chat.id, NoCommandError);
      continue;
    }

    const [ command, ...args ] = text.slice(1).split(' ');
    if (!CommandHandlers[command]) {
      yield call([bot, bot.sendMessage], chat.id, UnknownCommandError);
      continue;
    }

    yield call(CommandHandlers[command], session, args);
  }
}
