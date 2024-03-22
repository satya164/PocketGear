import { type StaticScreenProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { InteractionManager, StyleSheet, Text, View } from 'react-native';
import store from '../store';
import type { Pokemon, PokemonID } from '../types';
import getStrongAgainstPokemons from '../utils/getStrongAgainstPokemons';
import Appbar from './Appbar';
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
      const pokemon = store
        .getPokemons()
        .find((p) => p.id === route.params.pokemonId);
      if (!pokemon) {
        return;
      }
      const pokemons = getStrongAgainstPokemons(pokemon);
      setData(pokemons);
      setLoading(false);
    };

    InteractionManager.runAfterInteractions(updateData);
  }, [route.params.pokemonId]);

  const pokemon = store
    .getPokemons()
    .find((p) => p.id === route.params.pokemonId);
  if (!pokemon) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Appbar>
        <Text style={styles.title}>{pokemon.name}</Text>
        <Text style={styles.subtitle}>Strong against</Text>
      </Appbar>
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

  title: {
    fontFamily: 'Montserrat',
    color: '#222',
    fontSize: 15,
  },

  subtitle: {
    fontFamily: 'Montserrat',
    color: '#000',
    opacity: 0.5,
    fontSize: 11,
  },
});

export default StrongAgainstList;
