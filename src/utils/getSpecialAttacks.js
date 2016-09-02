/* @flow */

import store from '../store';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function getSpecialAttacks(pokemon: Pokemon) {
  const specialAttacks = store.getSpecialAttacks();

  return specialAttacks
    .filter(attack =>
      attack.known_by.includes(pokemon.id)
    )
    .sort((a, b) => (b.damage / b.duration) - (a.damage / a.duration));
}
