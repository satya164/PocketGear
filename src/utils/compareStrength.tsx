import store from '../store';

type PokemonData = {
  stats: {
    attack: number;
    defense: number;
    stamina: number;
  };
};

export default function compareStrength(a: PokemonData, b: PokemonData) {
  const max = store.getMaxValues();
  return (
    a.stats.attack / max.attack +
    a.stats.defense / max.defense +
    a.stats.stamina / max.stamina -
    (b.stats.attack / max.attack +
      b.stats.defense / max.defense +
      b.stats.stamina / max.stamina)
  );
}
