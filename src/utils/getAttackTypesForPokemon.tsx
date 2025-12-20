import { type Pokemon, type PokemonType } from '../types';

export default function getAttackTypesForPokemon(
  pokemon: Pokemon
): PokemonType[] {
  // Without move data, assume Pokemon can attack with their own types (STAB)
  return pokemon.types;
}
