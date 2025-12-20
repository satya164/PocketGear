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
  | 'Water';

export type PokemonID = number;

export type Pokemon = {
  id: PokemonID;
  name: string;
  types: PokemonType[];
  category: string;
  description: string;
  height: number; // meters
  weight: number; // kg
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  evolution?: {
    parent?: PokemonID;
    children?: {
      id: PokemonID;
      trigger: 'level-up' | 'trade' | 'use-item' | 'other';
      min_level?: number;
      min_happiness?: number;
      time_of_day?: 'day' | 'night';
      item?: string;
      held_item?: string;
    }[];
  };
  capture_rate: number;
  is_legendary: boolean;
  is_mythical: boolean;
  generation: number;
};

export type TypeChart = {
  name: PokemonType;
  super_effective: PokemonType[];
  not_very_effective: PokemonType[];
};

export type Move = {
  name: string;
  type: PokemonType;
  power?: number;
  accuracy?: number;
  pp: number;
  damage_class: 'physical' | 'special' | 'status';
};
