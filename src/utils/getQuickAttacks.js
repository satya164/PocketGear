/* @flow */

import store from '../store';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function getQuickAttacks(pokemon: Pokemon) {
  const quickAttacks = store.getQuickAttacks();

  return quickAttacks
    .filter(attack =>
      attack.known_by.includes(pokemon.id)
    )
    .map(attack => {
      if (pokemon.types.includes(attack.type)) {
        return {
          ...attack,
          damage: attack.damage * 1.25, // STAB
        };
      }
      return attack;
    })
    .sort((a, b) => (b.damage / b.duration) - (a.damage / a.duration));
}
