/* @flow */

import difference from 'lodash/difference';
import store from '../store';
import getStrongAgainstTypes from './getStrongAgainstTypes';
import getWeakAgainstTypes from './getWeakAgainstTypes';
import compareStrength from './compareStrength';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function getStrongAgainstPokemons(pokemon: Pokemon) {
  const strongAgainstAll = getStrongAgainstTypes(pokemon);
  const weakAgainstAll = getWeakAgainstTypes(pokemon);
  const strongAgainst = difference(strongAgainstAll, weakAgainstAll);

  return store.getPokemons()
  .filter(({ id }) => id !== pokemon.id)
  .filter(({ types }) =>
    types.some(t => strongAgainst.includes(t))
  )
  .sort(compareStrength);
}
