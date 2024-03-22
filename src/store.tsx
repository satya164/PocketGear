import type { ImageSourcePropType } from 'react-native';
import colors from './colors.json';
import moves from './data/moves.json';
import pokemons from './data/pokemons.json';
import typeChart from './data/type_chart.json';
import sprites from './sprites';
import type { Move, Pokemon, PokemonID, PokemonType, TypeChart } from './types';

const MAX_VALUES = {
  attack: 300,
  defense: 200,
  stamina: 320,
  max_hp: 163,
  max_cp: 3904,
};

function getAllPokemons(): Pokemon[] {
  return pokemons as Pokemon[];
}

function getPokemon(id: PokemonID): Pokemon | undefined {
  return getAllPokemons().find((p) => p.id === id);
}

function getAllMoves(): Move[] {
  return moves as Move[];
}

function getTypeChart(): TypeChart[] {
  return typeChart as TypeChart[];
}

function getSprite(id: PokemonID): ImageSourcePropType {
  return sprites[id - 1];
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
  getAllMoves,
  getTypeChart,
  getSprite,
  getColor,
  getMaxValues,
};
