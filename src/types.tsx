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

export type EvolutionItem =
  | 'Dragon Scale'
  | "King's Rock"
  | 'Metal Coat'
  | 'Sun Stone'
  | 'Up-Grade';

export type PokemonID = number;

export type Pokemon = {
  id: PokemonID;
  name: string;
  types: PokemonType[];
  category: string;
  description: string;
  name_origin: Array<{
    term: string;
    meaning: string;
  }>;
  moves: {
    quick: string[];
    cinematic: string[];
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
  evolution?: {
    parent?: PokemonID;
    branch?: Array<{
      id: PokemonID;
      candy_cost: number;
      item_requirement?: EvolutionItem;
    }>;
  };
  evolution_cp_multipliers?: Array<{
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
  encounter: {
    capture_rate?: number;
    flee_rate: number;
  };
  easter_eggs?: string[];
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
  duration: number;
  energy_delta: number;
  accuracy_chance: number;
  critical_chance?: number;
  stamina_loss: number;
  quick: boolean;
};
