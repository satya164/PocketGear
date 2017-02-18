/* @flow */

import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Heading from './Heading';
import store from '../store';
import type {
  Pokemon,
  PokemonID,
} from '../types';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  image: {
    marginVertical: 8,
    height: 48,
    width: 64,
    resizeMode: 'contain',
  },

  arrow: {
    fontSize: 24,
    marginHorizontal: 16,
    marginTop: 24,
  },

  requirements: {
    fontFamily: 'Montserrat',
    fontSize: 9,
    color: '#222',
    margin: 2,
  },

  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: '#222',
  },

  pokemon: {
    alignItems: 'center',
    marginVertical: 8,
  },

  item: {
    marginVertical: 8,
  },

  candy: {
    height: 10,
    width: 10,
    margin: 2,
    marginLeft: 0,
  },
});

type Props = {
  pokemon: Pokemon;
  navigation: Object;
}

export default class Evolution extends PureComponent<void, Props, void> {

  static propTypes = {
    pokemon: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  _goToPokemon = (pokemonId: PokemonID) => {
    this.props.navigation.navigate('Info', {
      pokemonId,
    });
  };

  render() {
    const pokemons = store.getPokemons();
    const { pokemon } = this.props;
    const { evolution } = pokemon;

    if (!evolution) {
      return null;
    }

    const parent = evolution.parent ? pokemons.find(it => it.id === evolution.parent) : null;
    const branch = evolution.branch ? evolution.branch.map(ev => ({
      poke: pokemons.find(p => p.id === ev.id),
      ev,
    })).filter(ev => ev.poke) : null;

    return (
      <View {...this.props}>
        <Heading>Evolution</Heading>
        <View style={styles.item}>
          {branch ? branch.map(({ ev, poke }) => (
            <View key={ev.id} style={styles.row}>
              {parent ? (
                <TouchableOpacity style={styles.pokemon} onPress={() => this._goToPokemon(parent.id)}>
                  <Image source={store.getSprite(parent.id)} style={styles.image} />
                  <Text style={styles.label}>{parent.name}</Text>
                </TouchableOpacity>
              ) : null}
              {parent ? (
                <Text style={styles.arrow}>→</Text>
              ) : null}
              <View style={styles.pokemon}>
                <Image source={store.getSprite(pokemon.id)} style={styles.image} />
                <Text style={styles.label}>{pokemon.name}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
              <TouchableOpacity style={styles.pokemon} onPress={() => poke && this._goToPokemon(poke.id)}>
                <Image source={poke ? store.getSprite(poke.id) : null} style={styles.image} />
                <Text style={styles.label}>{poke ? poke.name : ''}</Text>
                <View style={styles.row}>
                  <Image source={require('../../assets/images/candy.png')} style={styles.candy} />
                  <Text style={styles.requirements}>
                    {ev.candy_cost}
                  </Text>
                </View>
                {ev.item_requirement ? (
                  <Text style={styles.requirements}>
                    {ev.item_requirement}
                  </Text>
                ) : null}
              </TouchableOpacity>
            </View>
          )) : (
            <View style={styles.row}>
              {parent ? (
                <TouchableOpacity style={styles.pokemon} onPress={() => this._goToPokemon(parent.id)}>
                  <Image source={store.getSprite(parent.id)} style={styles.image} />
                  <Text style={styles.label}>{parent.name}</Text>
                </TouchableOpacity>
              ) : null}
              {parent ? (
                <Text style={styles.arrow}>→</Text>
              ) : null}
              <View style={styles.pokemon}>
                <Image source={store.getSprite(pokemon.id)} style={styles.image} />
                <Text style={styles.label}>{pokemon.name}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
