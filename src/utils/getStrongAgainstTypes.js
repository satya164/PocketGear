/* @flow */

import store from '../store';
import getAttackTypesForPokemon from './getAttackTypesForPokemon';
import type {
  Pokemon,
  PokemonType,
} from '../typeDefinitions';

export default function getStrongAgainstTypes(pokemon: Pokemon): Array<PokemonType> {
  const types = getAttackTypesForPokemon(pokemon);
  const typeChart = store.getTypeChart();
  return typeChart
    .filter(({ name }) => types.includes(name))
    .reduce((acc, curr) => {
      const merged = [ ...acc ];
      for (const type of curr.super_effective) {
        if (!merged.includes(type)) {
          merged.push(type);
        }
      }
      return merged;
    }, []);
}
