import find from 'lodash/find';
import React, { useCallback } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Appbar from './Appbar';
import PokemonTypeLabel from './PokemonTypeLabel';
import PokemonDetails from './PokemonDetails';
import PokemonMatches from './PokemonMatches';
import PokemonTools from './PokemonTools';
import store from '../store';
import { PokemonID } from '../types';
import NoResults from './NoResults';

type Props = {
  navigation: any;
  route: any;
  style?: StyleProp<ViewStyle>;
};

const MaterialTab = createMaterialTopTabNavigator();

function PokemonInfo(props: Props) {
  const getPokemon = useCallback((id: PokemonID) => {
    const pokemons = store.getPokemons();
    const pokemon = find(pokemons, { id });
    return pokemon;
  }, []);

  const pokemon = getPokemon(props.route.params.pokemonId);
  const sprite = store.getSprite(props.route.params.pokemonId);

  if (pokemon === undefined) {
    return (
      <NoResults
        source={require('../../assets/images/open-pokeball.png')}
        label="Pokemon not found"
      />
    );
  }

  return (
    <View {...props} style={[styles.container, props.style]}>
      <Appbar style={styles.appbar}>{'#' + pokemon.id}</Appbar>
      <View style={[styles.row, styles.meta]}>
        <View style={styles.basic}>
          <Text style={[styles.label, styles.name]}>{pokemon.name}</Text>
          <View style={styles.types}>
            {pokemon.types.map((type) => (
              <PokemonTypeLabel key={type} type={type} />
            ))}
          </View>
        </View>
        <Image style={styles.image} source={sprite} />
      </View>
      <MaterialTab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabbar,
          tabBarIndicatorStyle: styles.indicator,
          tabBarLabelStyle: styles.tablabel,
          tabBarActiveTintColor: '#222',
          tabBarInactiveTintColor: '#222',
        }}
      >
        <MaterialTab.Screen name="Details">
          {(props) => <PokemonDetails {...props} pokemon={pokemon} />}
        </MaterialTab.Screen>
        <MaterialTab.Screen name="Matches">
          {(props) => <PokemonMatches {...props} pokemon={pokemon} />}
        </MaterialTab.Screen>
        <MaterialTab.Screen name="Tools">
          {(props) => <PokemonTools {...props} pokemon={pokemon} />}
        </MaterialTab.Screen>
      </MaterialTab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  appbar: {
    elevation: 0,
    borderBottomWidth: 0,
    shadowOpacity: 0,
  },

  image: {
    marginHorizontal: 8,
    height: 72,
    resizeMode: 'contain',
  },

  label: {
    color: '#222',
    fontFamily: 'Montserrat',
    width: 160,
  },

  name: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    marginVertical: 4,
  },

  types: {
    flexDirection: 'row',
    marginHorizontal: -2,
  },

  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },

  meta: {
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  basic: {
    flex: 1,
  },

  tabbar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.16)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  tablabel: {
    color: '#222',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    marginVertical: 8,
  },

  indicator: {
    backgroundColor: '#222',
  },
});

export default PokemonInfo;
