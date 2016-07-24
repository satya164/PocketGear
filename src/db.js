import PokemonSchema from './schemas/pokemon.schema.js';
import TypesSchema from './schemas/type.schema.js';
import Realm from 'realm';

const db = new Realm({schema: [PokemonSchema, TypesSchema]});

export default db;

