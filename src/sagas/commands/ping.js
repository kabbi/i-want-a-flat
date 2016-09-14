import { call } from 'redux-saga/effects';

import { Pong } from '../../templates/general';

export default function* ({ bot, chat }) {
  yield call([bot, bot.sendMessage], chat.id, Pong);
}
