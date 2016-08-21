import test from 'ava';
import compareStrength from '../compareStrength';

test('should compare strength', t => {
  const a = {
    attack: 190,
    defense: 200,
    stamina: 168,
  };
  const b = {
    attack: 128,
    defense: 108,
    stamina: 78,
  };
  t.true(compareStrength(a, b) > 0);
});
