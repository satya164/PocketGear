/* eslint-env jest */

import compareStrength from '../compareStrength';

test('should compare strength', () => {
  const a = {
    stats: {
      attack: 190,
      defense: 200,
      stamina: 168,
    },
  };
  const b = {
    stats: {
      attack: 128,
      defense: 108,
      stamina: 78,
    },
  };
  expect(compareStrength(a, b)).toBeGreaterThan(0);
});
