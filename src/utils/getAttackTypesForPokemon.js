/* @flow */

import getQuickAttacks from './getQuickAttacks';
import getSpecialAttacks from './getSpecialAttacks';
import type { Pokemon, PokemonType } from '../types';

export default function getAttackTypesForPokemon(
  pokemon: Pokemon
): Array<PokemonType> {
  const quickAttacks = getQuickAttacks(pokemon);
  const specialAttacks = getSpecialAttacks(pokemon);

  const types = quickAttacks
    .concat(specialAttacks)
    .filter(attack => attack.power) // ignore attacks with 0 power, e.g.- Splash
    .map(attack => attack.type)
    .filter((type, i, self) => self.indexOf(type) === i);

  return types;
}
