/* @flow */

import store from '../store';
import type { Pokemon } from '../types';

export default function getSpecialAttacks(pokemon: Pokemon) {
  const moves = store.getMoves();

  return moves
    .filter(move => pokemon.moves.cinematic.includes(move.name))
    .sort((a, b) => (b.power || 0) / b.duration - (a.power || 0) / a.duration);
}
