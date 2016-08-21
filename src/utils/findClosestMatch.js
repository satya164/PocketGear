/* @flow */

import compareStrength from './compareStrength';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function findClosestMatch(pokemons: Array<Pokemon>, pokemon: Pokemon, stronger: boolean = true) {
  const items = pokemons.sort((a, b) => stronger ? compareStrength(a, b) : compareStrength(b, a));

  for (const p of items) {
    const difference = compareStrength(pokemon, p);
    if (difference === 0) {
      return p;
    }
  }

  for (const p of items) {
    const difference = compareStrength(pokemon, p);
    if (stronger) {
      if (difference < 0) {
        return p;
      }
    } else {
      if (difference > 0) {
        return p;
      }
    }
  }

  if (stronger) {
    return items[0];
  } else {
    return items[items.length - 1];
  }
}
