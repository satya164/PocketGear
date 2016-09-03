/* @flow */

export type PokemonType =
  | 'Bug'
  | 'Dark'
  | 'Dragon'
  | 'Electric'
  | 'Fairy'
  | 'Fighting'
  | 'Fire'
  | 'Flying'
  | 'Ghost'
  | 'Grass'
  | 'Ground'
  | 'Ice'
  | 'Normal'
  | 'Poison'
  | 'Psychic'
  | 'Rock'
  | 'Steel'
  | 'Water'

export type PokemonID = number;

export type Pokemon = {
  id: PokemonID;
  name: string;
  types: Array<PokemonType>;
  category: string;
  description: string;
  name_origin: Array<{
    term: string;
    meaning: string;
  }>;
  height: {
    amount: number;
    unit: 'm' | 'cm';
  };
  weight: {
    amount: number;
    unit: 'g' | 'kg';
  };
  average_cp: number;
  average_hp: number;
  max_cp: number;
  max_hp: number;
  stamina: number;
  attack: number;
  defense: number;
  capture_rate: number;
  flee_rate: number;
  egg_distance?: {
    amount: number;
    unit: 'km';
  };
  evolution_chains?: Array<Array<PokemonID>>;
  evolution_requirements: {
    amount: number;
    name: string;
  };
  evolution_cp_multipliers?: Array<{
    id: PokemonID;
    multipliers: {
      minimum: number;
      maximum: number;
    };
  }>;
  easter_eggs?: Array<string>;
}

export type TypeChart = {
  name: PokemonType;
  super_effective: Array<PokemonType>;
  not_very_effective: Array<PokemonType>;
}

export type Attack = {
  name: string;
  type: PokemonType;
  damage: number;
  duration: number;
  known_by: Array<PokemonID>;
}

export type QuickAttack = Attack & {
  energy_increase: number;
}

export type SpecialAttack = Attack & {
  critical_hit_chance: number;
  energy_requirement: number;
}
