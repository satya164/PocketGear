import type { StaticScreenProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { InteractionManager, StyleSheet, View } from 'react-native';
import store from '../store';
import type { Pokemon, PokemonID } from '../types';
import getWeakAgainstPokemons from '../utils/getWeakAgainstPokemons';
import NoResults from './NoResults';
import Placeholder from './Placeholder';
import PokemonList from './PokemonList';

function WeakAgainstList({
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
      const pokemons = getWeakAgainstPokemons(pokemon);
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
            label={`${pokemon.name} seems unbeatable`}
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

export default WeakAgainstList;
