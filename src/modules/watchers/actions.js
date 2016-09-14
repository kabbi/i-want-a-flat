import { createActions } from 'redux-actions';

import { positionalPayloadCreator } from '../../utils/redux';

export default createActions({
  StartWatcher: positionalPayloadCreator('id', 'session', 'url', 'options'),
  StopWatcher: positionalPayloadCreator('id'),
  UpdateWatcherData: positionalPayloadCreator('id', 'data'),
});
