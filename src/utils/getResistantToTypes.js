/* @flow */

import store from '../store';
import type { Pokemon } from '../types';

export default function getResistantToTypes(pokemon: Pokemon) {
  const { types } = pokemon;
  const typeChart = store.getTypeChart();

  return typeChart
    .filter(t => types.some(it => t.not_very_effective.includes(it)))
    .map(t => t.name);
}
