import { basename, dirname } from 'path';

export const getModuleDirectoryName = module => (
  basename(dirname(module.filename))
);
