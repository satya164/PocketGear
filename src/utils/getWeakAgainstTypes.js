/* @flow */

import store from '../store';
import type { Pokemon, PokemonType } from '../types';

export default function getWeakAgainstTypes(
  pokemon: Pokemon
): Array<PokemonType> {
  const { types } = pokemon;
  const typeChart = store.getTypeChart();

  return typeChart
    .filter(t => types.some(it => t.super_effective.includes(it)))
    .map(t => t.name);
}
