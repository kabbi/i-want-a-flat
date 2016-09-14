import { getModuleDirectoryName } from '../../utils/files';

const Path = getModuleDirectoryName(module);

export const getState = state => (
  state[Path]
);

export const getWatcherById = (state, id) => (
  getState(state).data[id]
);

export const getAllWatchers = state => (
  Object.values(getState(state).data).sort((w1, w2) => (
    w1.startTime - w2.startTime
  ))
);
