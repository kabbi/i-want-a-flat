import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createLoggerMiddleware from './middleware/logger';
import createTelegramMiddleware from './middleware/telegram';

import { rootReducer, rootSaga } from './modules';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    createTelegramMiddleware(process.env.TELEGRAM_BOT_TOKEN, {
      polling: true,
    }),
    createLoggerMiddleware([
      /^Telegram/,
    ]),
    sagaMiddleware
  )
);

sagaMiddleware.run(rootSaga);
