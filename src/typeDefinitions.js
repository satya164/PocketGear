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

export type Pokemon = {|
  id: PokemonID;
  name: string;
  types: Array<PokemonType>;
  category: string;
  description: string;
  name_origin: Array<{
    term: string;
    meaning: string;
  }>;
  moves: {
    quick: Array<string>;
    cinematic: Array<string>;
  };
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
  points: {
    max_cp: number;
  };
  evolution_chains?: Array<Array<PokemonID>>;
  evolution_cp_multipliers: Array<{
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
  buddy_distance?: {
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
|}

export type TypeChart = {|
  name: PokemonType;
  super_effective: Array<PokemonType>;
  not_very_effective: Array<PokemonType>;
|}

export type Move = {|
  name: string;
  type: PokemonType;
  power: number;
  duration: number;
  energy_delta: number;
  accuracy_chance: number;
  critical_chance?: number;
  stamina_loss: number;
  quick: boolean;
|}
