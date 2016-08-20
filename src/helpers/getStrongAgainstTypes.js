/* @flow */

import store from '../store';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function getStrongAgainstTypes(pokemon: Pokemon) {
  const typeChart = store.getTypeChart();
  const typeDetails = typeChart.find(({ name }) => pokemon.types.includes(name));
  return typeDetails.super_effective;
}
