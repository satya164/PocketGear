/* eslint-env jest */

import findClosestMatch from '../findClosestMatch';

const pokemons = [
  {
    id: 1,
    stats: {
      attack: 190,
      defense: 200,
      stamina: 168,
    },
  },
  {
    id: 2,
    stats: {
      attack: 128,
      defense: 108,
      stamina: 78,
    },
  },
  {
    id: 3,
    stats: {
      attack: 138,
      defense: 158,
      stamina: 28,
    },
  },
  {
    id: 4,
    stats: {
      attack: 118,
      defense: 108,
      stamina: 128,
    },
  },
];

test('should match if stats are same', () => {
  const pokemon = {
    id: 5,
    stats: {
      attack: 138,
      defense: 158,
      stamina: 28,
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
  const pokemon = {
    id: 5,
    stats: {
      attack: 124,
      defense: 118,
      stamina: 82,
    },
  };
  const match = findClosestMatch(pokemons, pokemon, true);
  expect(match).toBe(pokemons.find(p => p.id === 4));
});

test('should match closest weaker pokemon', () => {
  const pokemon = {
    id: 5,
    stats: {
      attack: 108,
      defense: 128,
      stamina: 53,
    },
  };
  const match = findClosestMatch(pokemons, pokemon, false);
  expect(match).toBe(pokemons.find(p => p.id === 2));
});

test('should match strongest pokemon if stronger than all', () => {
  const pokemon = {
    id: 5,
    stats: {
      attack: 210,
      defense: 230,
      stamina: 158,
    },
  };
  const match = findClosestMatch(pokemons, pokemon, false);
  expect(match).toBe(pokemons.find(p => p.id === 1));
});

test('should match weakest pokemon if weaker than all', () => {
  const pokemon = {
    id: 5,
    stats: {
      attack: 104,
      defense: 96,
      stamina: 72,
    },
  };
  const match = findClosestMatch(pokemons, pokemon, true);
  expect(match).toBe(pokemons.find(p => p.id === 2));
});
