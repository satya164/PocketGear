import type { ImageSourcePropType } from 'react-native';
import pokemons from '../data/pokemon.json';
import colors from './colors.json';
import typeChart from './data/type_chart.json';
import { getSprite as getSpriteFromMap } from './sprites';
import type { Pokemon, PokemonID, PokemonType, TypeChart } from './types';

const MAX_VALUES = {
  hp: 255,
  attack: 190,
  defense: 250,
  special_attack: 194,
  special_defense: 250,
  speed: 200,
};

function getAllPokemons(): Pokemon[] {
  return pokemons as Pokemon[];
}

function getPokemon(id: PokemonID): Pokemon | undefined {
  return getAllPokemons().find((p) => p.id === id);
}

function getTypeChart(): TypeChart[] {
  return typeChart as TypeChart[];
}

function getSprite(id: PokemonID): ImageSourcePropType | undefined {
  return getSpriteFromMap(id);
}

function getColor(type: PokemonType): string {
  return colors[type.toLowerCase() as keyof typeof colors];
}

function getMaxValues() {
  return MAX_VALUES;
}

export default {
  getAllPokemons,
  getPokemon,
  getTypeChart,
  getSprite,
  getColor,
  getMaxValues,
};
