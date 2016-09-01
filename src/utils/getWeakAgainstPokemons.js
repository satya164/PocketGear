/* @flow */

import store from '../store';
import getAttackTypesForPokemon from './getAttackTypesForPokemon';
import getWeakAgainstTypes from './getWeakAgainstTypes';
import compareStrength from './compareStrength';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function getWeakAgainstPokemons(pokemon: Pokemon) {
  const weakAgainst = getWeakAgainstTypes(pokemon);
  const weakAgainstPokemons = store.getPokemons()
  .filter(({ id }) => id !== pokemon.id)
  .filter(p => {
    const types = getAttackTypesForPokemon(p);
    return types.some(t => weakAgainst.includes(t));
  })
  .sort((a, b) => compareStrength(b, a));

  return weakAgainstPokemons;
}
