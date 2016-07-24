/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../colors.json';
import sprites from '../sprites';

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 2,
    elevation: 1,
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
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.6,
  },

  subtitle: {
    color: '#000',
    fontFamily: 'Lato',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.3,
  },
});

type Props = {
  onNavigate: Function;
  pokemon: any;
  style?: any;
}

export default class PokemonListCard extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired,
    style: View.propTypes.style,
  };

  _handlePress = () => {
    this.props.onNavigate({
      type: 'push',
      route: {
        name: 'info',
        props: {
          pokemonId: this.props.pokemon.id,
        },
      },
    });
  };

  render() {
    const { pokemon } = this.props;
    const types = pokemon.type.map(t => t.name).join(', ');
    const color = colors[pokemon.type[0].name.toLowerCase()];

    return (
      <TouchableOpacity
        key={pokemon.name}
        onPress={this._handlePress}
        activeOpacity={0.7}
        style={[ styles.block, { backgroundColor: color } ]}
      >
        <Text style={[ styles.index, styles.subtitle ]}>#{pokemon.id}</Text>
        <Image source={sprites[pokemon.id - 1]} style={styles.image} />
        <Text style={styles.title}>{pokemon.name}</Text>
        <Text style={styles.subtitle}>{types}</Text>
      </TouchableOpacity>
    );
  }
}
