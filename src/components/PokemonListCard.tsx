import React, { PureComponent } from 'react';
import { Image, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import TouchableItem from './TouchableItem';
import store from '../store';
import { Pokemon } from '../types';

type Props = {
  navigation: any;
  pokemon: Pokemon;
  style?: StyleProp<ViewStyle>;
};

export default class PokemonListCard extends PureComponent<Props> {
  _handlePress = () => {
    this.props.navigation.push('Info', {
      pokemonId: this.props.pokemon.id,
    });
  };

  render() {
    const { pokemon, style } = this.props;
    const types = pokemon.types.join(', ');
    const color = store.getColor(pokemon.types[0]);
    const sprite = store.getSprite(pokemon.id);

    return (
      <TouchableItem
        key={pokemon.name}
        onPress={this._handlePress}
        activeOpacity={0.7}
        style={[styles.block, { backgroundColor: color }, style]}
      >
        <Text style={[styles.index, styles.subtitle]}>#{pokemon.id}</Text>
        <Image source={sprite} style={styles.image} />
        <Text style={styles.title}>{pokemon.name}</Text>
        <Text style={styles.subtitle}>{types}</Text>
      </TouchableItem>
    );
  }
}

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
