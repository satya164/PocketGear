/* @flow */

import PokemonSchema from './schemas/pokemon.schema';
import TypesSchema from './schemas/type.schema';
import Realm from 'realm';

const db = new Realm({ schema: [ PokemonSchema, TypesSchema ] });

export default db;
