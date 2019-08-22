import pokemons from './data/pokemons.json';
import moves from './data/moves.json';
import typeChart from './data/type_chart.json';
import colors from './colors.json';
import sprites from './sprites';
import { Pokemon, PokemonID, PokemonType, Move, TypeChart } from './types';

const MAX_VALUES = {
  attack: 300,
  defense: 200,
  stamina: 320,
  max_hp: 163,
  max_cp: 3904,
};

function getPokemons(): Pokemon[] {
  return pokemons as Pokemon[];
}

function getMoves(): Move[] {
  return moves as Move[];
}

function getTypeChart(): TypeChart[] {
  return typeChart as TypeChart[];
}

function getSprite(id: PokemonID): any {
  return sprites[id - 1];
}

function getColor(type: PokemonType): string {
  return colors[type.toLowerCase() as keyof typeof colors];
}

function getMaxValues() {
  return MAX_VALUES;
}

export default {
  getPokemons,
  getMoves,
  getTypeChart,
  getSprite,
  getColor,
  getMaxValues,
};
