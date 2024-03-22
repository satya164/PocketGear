import React from 'react';
import { type Pokemon } from '../types';

const PokemonContext = React.createContext<Pokemon | null>(null);

export function usePokemon() {
  const pokemon = React.useContext(PokemonContext);

  if (!pokemon) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }

  return pokemon;
}

export function PokemonProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Pokemon;
}) {
  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
}
