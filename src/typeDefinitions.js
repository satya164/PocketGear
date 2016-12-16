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
  measurements: {
    height: {
      amount: number;
      unit: 'm' | 'cm';
    };
    weight: {
      amount: number;
      unit: 'g' | 'kg';
    };
  };
  stats: {
    stamina: number;
    attack: number;
    defense: number;
  };
  points?: { // TODO
    average_cp: number;
    average_hp: number;
    max_cp: number;
    max_hp: number;
  };
  evolution_chains?: Array<Array<PokemonID>>;
  evolution_cp_multipliers?: Array<{ // TODO
    id: PokemonID;
    multipliers: {
      minimum: number;
      maximum: number;
    };
  }>;
  egg_distance?: {
    amount: number;
    unit: 'km';
  };
  evolution_requirements: {
    amount: number;
    name: string;
  };
  encounter: {
    capture_rate: number;
    flee_rate: number;
  };
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
