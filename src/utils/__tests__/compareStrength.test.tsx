import { expect, jest, test } from '@jest/globals';

import compareStrength from '../compareStrength';

jest.mock('../../sprites', () => ({
  getSprite: () => undefined,
}));

test('should compare strength', () => {
  const a = {
    stats: {
      attack: 190,
      defense: 200,
      hp: 168,
    },
  };
  const b = {
    stats: {
      attack: 128,
      defense: 108,
      hp: 78,
    },
  };
  expect(compareStrength(a, b)).toBeGreaterThan(0);
});
