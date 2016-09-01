/* @flow */

import store from '../store';
import type {
  Pokemon,
  PokemonType,
} from '../typeDefinitions';

export default function getAttackTypesForPokemon(pokemon: Pokemon): Array<PokemonType> {
  const quickAttacks = store.getQuickAttacks().filter(attack => attack.known_by.includes(pokemon.id));
  const specialAttacks = store.getSpecialAttacks().filter(attack => attack.known_by.includes(pokemon.id));

  const types = quickAttacks
    .concat(specialAttacks)
    .map(attack => attack.type)
    .filter((type, i, self) =>
      self.indexOf(type) === i
    );

  return types;
}
