import assert from 'assert';

import { sum } from './index';

describe('index', function() {
  describe('sum', function() {
    it('should return a + b', function() {
      assert(sum(1, 2) === 3);
    });
    it('fail - 1', function() {
      const v1 = 1;
      const v2 = 3;

      assert(sum(v1, v2) === 3);
    });
    it('fail - 2', function() {
      const v1 = [0, 1, 2];
      const v2 = [0, 4, 2];

      assert.deepStrictEqual(v1, v2);
    });
  });
});
