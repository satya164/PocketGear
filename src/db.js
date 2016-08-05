/* @flow */

import Realm from 'realm';
import PokemonIdSchema from './schemas/PokemonId.schema';
import PokemonSchema from './schemas/Pokemon.schema';
import TypesSchema from './schemas/Type.schema';
import HeightSchema from './schemas/Height.schema';
import WeightSchema from './schemas/Weight.schema';
import EvolutionSchema from './schemas/Evolution.schema';

const db = new Realm({
  schema: [
    PokemonIdSchema,
    PokemonSchema,
    TypesSchema,
    HeightSchema,
    WeightSchema,
    EvolutionSchema,
  ],
});

export default db;
