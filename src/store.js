/* @flow */

import pokemons from './data/pokemons.json';
import quickAttacks from './data/quick_attacks.json';
import specialAttacks from './data/special_attacks.json';
import typeChart from './data/type_chart.json';
import colors from './colors.json';
import sprites from './sprites';
import type {
  Pokemon,
  PokemonID,
  PokemonType,
  QuickAttack,
  SpecialAttack,
  TypeChart,
} from './typeDefinitions';

function getPokemons(): Array<Pokemon> {
  return pokemons;
}

function getQuickAttacks(): Array<QuickAttack> {
  return quickAttacks;
}

function getSpecialAttacks(): Array<SpecialAttack> {
  return specialAttacks;
}

function getTypeChart(): Array<TypeChart> {
  return typeChart;
}

function getSprite(id: PokemonID): any {
  return sprites[id - 1];
}

function getColor(type: PokemonType): string {
  return colors[type.toLowerCase()];
}

export default {
  getPokemons,
  getQuickAttacks,
  getSpecialAttacks,
  getTypeChart,
  getSprite,
  getColor,
};
