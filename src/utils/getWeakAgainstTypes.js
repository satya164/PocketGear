/* @flow */

import store from '../store';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function getWeakAgainstTypes(pokemon: Pokemon) {
  const typeChart = store.getTypeChart();
  const weakAgainst = typeChart.filter(t =>
    pokemon.types.some(type => t.super_effective.includes(type)) &&
    !pokemon.types.some(type => t.not_very_effective.includes(type))
  ).map(t => t.name);

  return weakAgainst;
}
