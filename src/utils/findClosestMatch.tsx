import compareStrength from './compareStrength';

type PokemonData = {
  id: number;
  stats: {
    attack: number;
    defense: number;
    stamina: number;
  };
};

export default function findClosestMatch<T extends PokemonData>(
  pokemons: T[],
  pokemon: T,
  stronger: boolean = true
) {
  const items = pokemons.sort((a, b) =>
    stronger ? compareStrength(a, b) : compareStrength(b, a)
  );

  const item = items.find(p => {
    const difference = compareStrength(pokemon, p);

    if (difference === 0) {
      return true;
    }

    if (stronger) {
      if (difference < 0) {
        return true;
      }
    } else {
      if (difference > 0) {
        return true;
      }
    }

    return false;
  });

  return item !== undefined ? item : items[items.length - 1];
}
