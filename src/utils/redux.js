import { createActions as baseCreateActions } from 'redux-actions';

export const positionalPayloadCreator = (...options) => (
  (...args) => args.reduce((payload, value, index) => {
    payload[options[index]] = value;
    return payload;
  }, {})
);

export const createActions = (actionsObject, ...identityActions) => {
  const newActionsObject = {};
  for (const key of Object.keys(actionsObject)) {
    const value = actionsObject[key];
    if (Array.isArray(value) && typeof value[0] === 'string') {
      newActionsObject[key] = positionalPayloadCreator(...value);
    } else {
      newActionsObject[key] = value;
    }
  }
  return baseCreateActions(newActionsObject, ...identityActions);
};

export const composeReducers = (...reducers) => (
  (state, action) => reducers.reduce((currentState, reducer) => (
    reducer(currentState, action)
  ), state)
);
