import * as utils from './files';

describe('utils.files', () => {
  describe('getModuleDirectoryName', () => {
    it('works on test module', () => {
      expect(utils.getModuleDirectoryName(module)).toBe('utils');
    });
    it('works on fake modules', () => {
      expect(utils.getModuleDirectoryName({
        filename: '/some/long/cool-dir-name/module.js',
      })).toBe('cool-dir-name');
    });
  });
});
