/* @flow */

import store from '../store';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function compareStrength(a: Pokemon, b: Pokemon) {
  const max = store.getMaxValues();
  return (
    (a.stats.attack / max.attack + a.stats.defense / max.defense + a.stats.stamina / max.stamina) -
    (b.stats.attack / max.attack + b.stats.defense / max.defense + b.stats.stamina / max.stamina)
  );
}
