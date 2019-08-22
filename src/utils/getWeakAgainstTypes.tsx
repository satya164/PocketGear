import store from '../store';
import { Pokemon, PokemonType } from '../types';

export default function getWeakAgainstTypes(pokemon: Pokemon): PokemonType[] {
  const { types } = pokemon;
  const typeChart = store.getTypeChart();

  return typeChart
    .filter(t => types.some(it => t.super_effective.includes(it)))
    .map(t => t.name);
}
