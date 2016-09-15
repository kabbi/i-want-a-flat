import TelegramBot from 'node-telegram-bot-api';
import { channel, eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import sessionHandler from './session';

import { WrongChatError } from '../templates/errors';

const makeBotUpdatesChannel = bot => (
  eventChannel(emitter => {
    bot.on('message', emitter);
    return () => {
      bot.removeEventListener('message', emitter);
    };
  })
);

function* handleUpdate(bot, sessions, update) {
  const { from, chat } = update;

  if (!from || chat.type !== 'private') {
    yield call([bot, bot.sendMessage], chat.id, WrongChatError);
    return;
  }

  let session = sessions[chat.id];
  if (!session) {
    session = sessions[chat.id] = {
      updates: channel(),
      owner: update.from,
      chat: update.chat,
      data: {},
      bot,
    };
    yield fork(sessionHandler, session);
  }

  yield put(session.updates, update);
}

export default function* () {
  console.log('Spinning up the bot');
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
    polling: true,
  });

  const updates = makeBotUpdatesChannel(bot);
  const sessions = {};

  while (true) {
    const update = yield take(updates);
    yield fork(handleUpdate, bot, sessions, update);
  }
}
