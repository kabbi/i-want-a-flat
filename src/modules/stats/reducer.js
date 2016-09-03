import { combineReducers } from 'redux';

const initialState = {
  actionCountByType: {},
  totalActionCount: 0,
};

const actionCountByType = (state = initialState.actionCountByType, action) => {
  const { type } = action;
  const newState = { ...state };
  if (newState[type] == null) {
    newState[type] = 0;
  }
  newState[type] += 1;
  return newState;
};

const totalActionCount = (state = initialState.totalActionCount) => (
  state + 1
);

export default combineReducers({
  actionCountByType,
  totalActionCount,
});
