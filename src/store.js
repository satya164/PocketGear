/* @flow */

import pokemons from './data/pokemons.json';
import fastAttacks from './data/fast_attacks.json';
import specialAttacks from './data/special_attacks.json';
import types from './data/types.json';

function getPokemons() {
  return pokemons;
}

function getFastAttacks() {
  return fastAttacks;
}

function getSpecialAttacks() {
  return specialAttacks;
}

function getTypes() {
  return types;
}

export default {
  getPokemons,
  getFastAttacks,
  getSpecialAttacks,
  getTypes,
};
