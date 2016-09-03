import { createActions } from 'redux-actions';

const argumentArrayPayloadCreator = (...args) => ({
  args,
});

const makeTelegramMeta = method => () => ({
  telegramMethod: method,
});

export default createActions({
  TelegramSendMessage: [
    argumentArrayPayloadCreator,
    makeTelegramMeta('sendMessage', [
      'chatId', 'message', 'options',
    ]),
  ],
}, (
  'TelegramEvent'
));
