import { createActions } from '../../utils/redux';

export default createActions({
  WorkerStart: ['id', 'options'],
  WorkerStop: ['id'],
});
