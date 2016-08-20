/* @flow */

import store from '../store';
import getStrongAgainstTypes from './getStrongAgainstTypes';
import getWeakAgainstTypes from './getWeakAgainstTypes';
import compareStrength from './compareStrength';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function getStrongAgainstPokemons(pokemon: Pokemon) {
  const strongAgainst = getStrongAgainstTypes(pokemon);
  const weakAgainst = getWeakAgainstTypes(pokemon);
  const strongAgainstPokemons = store.getPokemons()
  .filter(({ id }) => id !== pokemon.id)
  .filter(({ types }) =>
    types.some(t => strongAgainst.includes(t)) && !types.some(t => weakAgainst.includes(t))
  )
  .sort(compareStrength);

  return strongAgainstPokemons;
}
