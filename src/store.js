import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { inspect } from 'util';

import { rootReducer, rootSaga } from './modules';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = () => next => action => {
  console.log('->', action.type, inspect(action.payload, {
    breakLength: Infinity,
  }));
  return next(action);
};

export default {
  ...createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      loggerMiddleware,
      sagaMiddleware
    )
  ),
  run: sagaMiddleware.run,
};

sagaMiddleware.run(rootSaga);
