import { type StaticScreenProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { InteractionManager, StyleSheet, View } from 'react-native';
import store from '../store';
import type { Pokemon, PokemonID } from '../types';
import getStrongAgainstPokemons from '../utils/getStrongAgainstPokemons';
import NoResults from './NoResults';
import Placeholder from './Placeholder';
import PokemonList from './PokemonList';

function StrongAgainstList({
  route,
}: StaticScreenProps<{ pokemonId: PokemonID }>) {
  const [data, setData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateData = () => {
      const pokemon = store.getPokemon(route.params.pokemonId);

      if (!pokemon) {
        return;
      }
      const pokemons = getStrongAgainstPokemons(pokemon);
      setData(pokemons);
      setLoading(false);
    };

    InteractionManager.runAfterInteractions(updateData);
  }, [route.params.pokemonId]);

  const pokemon = store.getPokemon(route.params.pokemonId);

  if (!pokemon) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loading ? (
          <Placeholder />
        ) : data.length ? (
          <PokemonList data={data} />
        ) : (
          <NoResults
            source={require('../../assets/images/chansey.png')}
            label={`${pokemon.name} seems weak`}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default StrongAgainstList;
