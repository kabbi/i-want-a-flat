import TelegramBot from 'node-telegram-bot-api';

import actions from '../modules/telegram/actions';

export default (...options) => ({ dispatch }) => {
  const bot = new TelegramBot(...options);
  bot.on('message', payload => {
    dispatch(actions.telegramEvent(payload));
  });
  return next => action => {
    const { payload, meta } = action;
    if (!meta || !meta.telegramMethod) {
      return next(action);
    }
    next(action);
    // TODO: Dispatch success/fail async actions
    return bot[meta.telegramMethod](...payload.args);
  };
};
