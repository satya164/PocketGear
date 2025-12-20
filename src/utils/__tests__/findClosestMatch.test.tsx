import { expect, jest, test } from '@jest/globals';

import findClosestMatch from '../findClosestMatch';

jest.mock('../../sprites', () => ({
  getSprite: () => undefined,
}));

const pokemons = [
  {
    id: 1,
    stats: {
      attack: 190,
      defense: 200,
      hp: 168,
    },
  },
  {
    id: 2,
    stats: {
      attack: 128,
      defense: 108,
      hp: 78,
    },
  },
  {
    id: 3,
    stats: {
      attack: 138,
      defense: 158,
      hp: 28,
    },
  },
  {
    id: 4,
    stats: {
      attack: 118,
      defense: 108,
      hp: 128,
    },
  },
];

test('should match if stats are same', () => {
  const pokemon = {
    id: 5,
    stats: {
      attack: 138,
      defense: 158,
      hp: 28,
    },
  };
  const strong = findClosestMatch(pokemons, pokemon, false);
  const weak = findClosestMatch(pokemons, pokemon, true);
  expect(strong).not.toEqual(pokemon);
  expect(weak).not.toEqual(pokemon);
  expect({ ...strong, id: 5 }).toEqual(pokemon);
  expect({ ...weak, id: 5 }).toEqual(pokemon);
});

test('should match closest stronger pokemon', () => {
  // With MAX_VALUES {hp: 255, attack: 190, defense: 250}
  // Pokemon strengths: #1=2.459, #4=1.555, #3=1.468, #2=1.412
  // The algorithm returns the first pokemon in sorted order that's stronger
  // Since #1 is sorted first and stronger than this pokemon, it returns #1
  const pokemon = {
    id: 5,
    stats: {
      attack: 135,
      defense: 130,
      hp: 90,
    },
  };
  const match = findClosestMatch(pokemons, pokemon, true);
  expect(match).toBe(pokemons.find((p) => p.id === 1));
});

test('should match closest weaker pokemon', () => {
  const pokemon = {
    id: 5,
    stats: {
      attack: 108,
      defense: 128,
      hp: 53,
    },
  };
  const match = findClosestMatch(pokemons, pokemon, false);
  expect(match).toBe(pokemons.find((p) => p.id === 2));
});

test('should match strongest pokemon if stronger than all', () => {
  const pokemon = {
    id: 5,
    stats: {
      attack: 210,
      defense: 230,
      hp: 158,
    },
  };
  const match = findClosestMatch(pokemons, pokemon, false);
  expect(match).toBe(pokemons.find((p) => p.id === 1));
});

test('should match weakest pokemon if weaker than all', () => {
  const pokemon = {
    id: 5,
    stats: {
      attack: 104,
      defense: 96,
      hp: 72,
    },
  };
  const match = findClosestMatch(pokemons, pokemon, true);
  expect(match).toBe(pokemons.find((p) => p.id === 2));
});
