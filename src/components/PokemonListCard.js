/* @flow */

import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import TouchableItem from './TouchableItem';
import store from '../store';
import type {
  Pokemon,
} from '../typeDefinitions';

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 2,
  },

  image: {
    margin: 16,
    height: 72,
    resizeMode: 'contain',
  },

  index: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 8,
  },

  title: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.7,
  },

  subtitle: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 11,
    textAlign: 'center',
    opacity: 0.5,
  },
});

type Props = {
  navigation: Object;
  pokemon: Pokemon;
  style?: any;
}

export default class PokemonListCard extends PureComponent<void, Props, void> {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    pokemon: PropTypes.object.isRequired,
    style: View.propTypes.style,
  };

  _handlePress = () => {
    this.props.navigation.navigate('Info', {
      pokemonId: this.props.pokemon.id,
    });
  };

  render() {
    const { pokemon } = this.props;
    const types = pokemon.types.join(', ');
    const color = store.getColor(pokemon.types[0]);
    const sprite = store.getSprite(pokemon.id);

    return (
      <TouchableItem
        key={pokemon.name}
        onPress={this._handlePress}
        activeOpacity={0.7}
        style={[ styles.block, { backgroundColor: color } ]}
      >
        <Text style={[ styles.index, styles.subtitle ]}>#{pokemon.id}</Text>
        <Image source={sprite} style={styles.image} />
        <Text style={styles.title}>{pokemon.name}</Text>
        <Text style={styles.subtitle}>{types}</Text>
      </TouchableItem>
    );
  }
}
