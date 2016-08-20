/* @flow */

import compareStrength from './compareStrength';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function findClosestMatch(pokemons: Array<Pokemon>, pokemon: Pokemon, stronger: boolean = true) {
  const items = pokemons.sort((a, b) => compareStrength(b, a));

  for (const p of pokemons) {
    const difference = compareStrength(pokemon, p);
    if (difference === 0) {
      return p;
    }
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
    return items[items.length - 1];
  } else {
    return items[0];
  }
}
