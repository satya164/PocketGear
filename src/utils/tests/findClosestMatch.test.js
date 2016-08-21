import test from 'ava';
import findClosestMatch from '../findClosestMatch';

const pokemons = [
  {
    id: 1,
    attack: 190,
    defense: 200,
    stamina: 168,
  },
  {
    id: 2,
    attack: 128,
    defense: 108,
    stamina: 78,
  },
  {
    id: 3,
    attack: 138,
    defense: 158,
    stamina: 28,
  },
  {
    id: 4,
    attack: 118,
    defense: 108,
    stamina: 128,
  },
];

test('should match if stats are same', t => {
  const pokemon = {
    id: 5,
    attack: 138,
    defense: 158,
    stamina: 28,
  };
  const strong = findClosestMatch(pokemons, pokemon, false);
  const weak = findClosestMatch(pokemons, pokemon, true);
  t.notDeepEqual(strong, pokemon);
  t.notDeepEqual(weak, pokemon);
  t.deepEqual({ ...strong, id: 5 }, pokemon);
  t.deepEqual({ ...weak, id: 5 }, pokemon);
});

test('should match closest stronger pokemon', t => {
  const pokemon = {
    id: 5,
    attack: 124,
    defense: 118,
    stamina: 82,
  };
  const match = findClosestMatch(pokemons, pokemon, true);
  t.is(match, pokemons.find(p => p.id === 4));
});

test('should match closest weaker pokemon', t => {
  const pokemon = {
    id: 5,
    attack: 108,
    defense: 128,
    stamina: 53,
  };
  const match = findClosestMatch(pokemons, pokemon, false);
  t.is(match, pokemons.find(p => p.id === 2));
});
