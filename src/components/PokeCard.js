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
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: 'Lato',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.5,
  },
});

type Props = {
  onNavigate: Function;
  pokemon: any;
  style?: any;
}

export default class PokeCard extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired,
    style: View.propTypes.style,
  };

  _handlePress = () => {
    this.props.onNavigate({
      type: 'push',
      route: {
        name: 'details',
        props: {
          pokemonId: this.props.pokemon.id,
        },
      },
    });
  };

  render() {
    const { pokemon } = this.props;
    const types = pokemon.type.map(t => t);
    const typeColor = types[0].name.toLowerCase() + 'Dark';
    const color = colors[typeColor] || colors.normalDark;

    return (
      <TouchableOpacity
        onPress={this._handlePress}
        activeOpacity={0.7}
        style={styles.block}>
        <Text style={[ styles.index, styles.subtitle, { color } ]}>
          #{pokemon.id}
        </Text>
        <Image key={pokemon.id} source={sprites[pokemon.id - 1]} style={styles.image} />
        <Text style={[ styles.title, { color } ]}>{pokemon.name}</Text>
        <Text style={[ styles.subtitle, { color } ]}>
          {types.map(t => t.name).join(', ')}
        </Text>
      </TouchableOpacity>
    );
  }
}
