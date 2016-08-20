/* @flow */

import store from '../store';
import type {
  PokemonID,
} from '../typeDefinitions';

export default function getQuickAttacks(id: PokemonID) {
  const quickAttacks = store.getQuickAttacks();

  return quickAttacks.filter(attack =>
    attack.known_by.includes(id)
  ).sort((a, b) => b.damage - a.damage);
}
