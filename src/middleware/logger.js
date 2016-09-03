export default (blackList, options = {}) => () => next => action => {
  const { type, payload, meta } = action;
  const result = next(action);

  if (blackList.some(expr => expr.test(type))) {
    return result;
  }

  let message = `[${type}]`;
  if (!options.skipPayload) {
    message += ` {${(JSON.stringify(payload) || '').slice(1, -1)}}`;
  }
  if (!options.skipMeta) {
    message += ` (${(JSON.stringify(meta) || '').slice(1, -1)})`;
  }
  // eslint-disable-next-line no-console
  console.log(message);
  return result;
};
