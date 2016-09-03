import * as utils from './redux';

describe('utils.redux', () => {
  describe('positionalPayloadCreator', () => {
    it('can accept no arguments', () => {
      const creator = utils.positionalPayloadCreator();
      expect(typeof creator).toBe('function');
      expect(creator()).toEqual({});
    });
    it('can work', () => {
      const creator = utils.positionalPayloadCreator('i', 'really');
      expect(typeof creator).toBe('function');
      expect(creator('am', 'working')).toEqual({
        i: 'am',
        really: 'working',
      });
    });
  });
});
