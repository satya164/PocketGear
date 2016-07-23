/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import data from '../data.json';
import sprites from '../sprites';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },

  description: {
    color: '#222',
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 21,
    margin: 8,
  },

  evolutions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 8,
  },

  pokemon: {
    alignItems: 'center',
  },

  image: {
    height: 32,
    width: 64,
    resizeMode: 'contain',
  },

  arrow: {
    color: '#222',
    marginTop: 6,
    fontSize: 16,
  },

  name: {
    color: '#222',
    fontFamily: 'Lato',
    fontSize: 12,
    marginVertical: 8,
  },
});


type Props = {
  index: number;
  style?: any;
  onNavigate: Function;
}

export default class PokemonDetails extends Component<void, Props, void> {

  static propTypes = {
    index: PropTypes.number.isRequired,
    style: ScrollView.propTypes.style,
    onNavigate: PropTypes.func.isRequired,
  };

  _goToPokemon = (index: number) => () => {
    this.props.onNavigate({
      type: 'push',
      route: {
        name: 'info',
        props: {
          index,
        },
      },
    });
  };

  render() {
    const { index } = this.props;
    const item = data[index - 1];

    return (
      <ScrollView {...this.props} style={[ styles.container, this.props.style ]}>
        <Text style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.evolutions}>
          <TouchableOpacity style={styles.pokemon} onPress={this._goToPokemon(1)}>
            <Image style={styles.image} source={sprites[0]} />
            <Text style={styles.name}>Bulbasaur</Text>
          </TouchableOpacity>
          <Text style={styles.arrow}>→</Text>
          <TouchableOpacity style={styles.pokemon} onPress={this._goToPokemon(2)}>
            <Image style={styles.image} source={sprites[1]} />
            <Text style={styles.name}>Ivysaur</Text>
          </TouchableOpacity>
          <Text style={styles.arrow}>→</Text>
          <TouchableOpacity style={styles.pokemon} onPress={this._goToPokemon(3)}>
            <Image style={styles.image} source={sprites[2]} />
            <Text style={styles.name}>Venusaur</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
