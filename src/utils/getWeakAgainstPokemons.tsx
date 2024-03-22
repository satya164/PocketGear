import difference from 'lodash/difference';
import intersection from 'lodash/intersection';
import store from '../store';
import type { Pokemon } from '../types';
import compareStrength from './compareStrength';
import getAttackTypesForPokemon from './getAttackTypesForPokemon';
import getStrongAgainstTypes from './getStrongAgainstTypes';
import getWeakAgainstTypes from './getWeakAgainstTypes';

export default function getWeakAgainstPokemons(pokemon: Pokemon) {
  const strongAgainstAll = getStrongAgainstTypes(pokemon);
  const weakAgainstAll = getWeakAgainstTypes(pokemon);
  const weakAgainst = difference(weakAgainstAll, strongAgainstAll);

  return store
    .getAllPokemons()
    .filter(({ id }) => id !== pokemon.id)
    .filter((p) =>
      intersection(p.types, getAttackTypesForPokemon(p)).some((t) =>
        weakAgainst.includes(t)
      )
    )
    .sort((a, b) => compareStrength(b, a));
}
