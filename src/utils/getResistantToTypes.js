/* @flow */

import store from '../store';
import getAttackTypesForPokemon from './getAttackTypesForPokemon';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function getResistantToTypes(pokemon: Pokemon) {
  const types = getAttackTypesForPokemon(pokemon);
  const typeChart = store.getTypeChart();
  const resistantTo = typeChart.filter(t =>
    types.some(type => t.not_very_effective.includes(type)) &&
    !types.some(type => t.super_effective.includes(type))
  ).map(t => t.name);

  return resistantTo;
}
