/* @flow */

import store from '../store';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function compareStrength(a: Pokemon, b: Pokemon) {
  const max = store.getMaxValues();
  return (
    (a.attack / max.attack + a.defense / max.defense + a.stamina / max.stamina) -
    (b.attack / max.attack + b.defense / max.defense + b.stamina / max.stamina)
  );
}
