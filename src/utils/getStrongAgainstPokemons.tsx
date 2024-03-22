import difference from 'lodash/difference';
import store from '../store';
import type { Pokemon } from '../types';
import compareStrength from './compareStrength';
import getStrongAgainstTypes from './getStrongAgainstTypes';
import getWeakAgainstTypes from './getWeakAgainstTypes';

export default function getStrongAgainstPokemons(pokemon: Pokemon) {
  const strongAgainstAll = getStrongAgainstTypes(pokemon);
  const weakAgainstAll = getWeakAgainstTypes(pokemon);
  const strongAgainst = difference(strongAgainstAll, weakAgainstAll);

  return store
    .getAllPokemons()
    .filter(({ id }) => id !== pokemon.id)
    .filter(({ types }) => types.some((t) => strongAgainst.includes(t)))
    .sort(compareStrength);
}
