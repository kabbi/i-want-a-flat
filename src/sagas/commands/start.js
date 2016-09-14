import { call } from 'redux-saga/effects';

import { Welcome } from '../../templates/general';

export default function* ({ bot, chat }) {
  yield call([bot, bot.sendMessage], chat.id, Welcome, {
    parse_mode: 'Markdown',
  });
}
