import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, InteractionManager } from 'react-native';
import Placeholder from './Placeholder';
import Appbar from './Appbar';
import PokemonList from './PokemonList';
import NoResults from './NoResults';
import getWeakAgainstPokemons from '../utils/getWeakAgainstPokemons';
import store from '../store';
import { Pokemon } from '../types';

type Props = {
  navigation: any;
  route: any;
};

function WeakAgainstList({ navigation, route }: Props) {
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
      const pokemons = getWeakAgainstPokemons(pokemon);
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
        <Text style={styles.subtitle}>Weak against</Text>
      </Appbar>
      <View style={styles.content}>
        {loading ? (
          <Placeholder />
        ) : data.length ? (
          <PokemonList data={data} navigation={navigation} />
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

export default WeakAgainstList;
