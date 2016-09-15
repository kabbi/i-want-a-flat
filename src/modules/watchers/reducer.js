import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import actions from './actions';

export const InitialState = {
  data: {},
  ids: [],
};

const dataReducer = handleActions({
  [actions.startWatcher]: (state, { payload: { id, ...otherData } }) => ({
    ...state,
    [id]: {
      ...otherData,
      status: 'running',
      id,
    },
  }),
  [actions.stopWatcher]: (state, { payload: { id } }) => ({
    ...state,
    [id]: {
      ...state[id],
      status: 'stopped',
    },
  }),
  [actions.updateWatcherData]: (state, { payload: { id, data } }) => ({
    ...state,
    [id]: {
      ...state[id],
      ...data,
    },
  }),
}, InitialState.data);

const idsReducer = handleActions({
  [actions.startWatcher]: (state, { payload: { id } }) => [
    ...state, id,
  ],
}, InitialState.ids);

export default combineReducers({
  data: dataReducer,
  ids: idsReducer,
});
