/* @flow */

import store from '../store';
import getStrongAgainstTypes from './getStrongAgainstTypes';
import compareStrength from './compareStrength';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function getStrongAgainstPokemons(pokemon: Pokemon) {
  const strongAgainst = getStrongAgainstTypes(pokemon);
  const strongAgainstPokemons = store.getPokemons()
  .filter(({ id }) => id !== pokemon.id)
  .filter(({ types }) =>
    types.some(t => strongAgainst.includes(t))
  )
  .sort(compareStrength);

  return strongAgainstPokemons;
}
