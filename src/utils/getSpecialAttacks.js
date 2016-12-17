/* @flow */

import store from '../store';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function getSpecialAttacks(pokemon: Pokemon) {
  const moves = store.getMoves();

  return moves
    .filter(move =>
      pokemon.moves.cinematic.includes(move.name)
    )
    .sort((a, b) => (b.power / b.duration) - (a.power / a.duration));
}
