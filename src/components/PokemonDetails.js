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
import colors from '../colors.json';
import sprites from '../sprites';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },

  description: {
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
    marginTop: 6,
    fontSize: 16,
  },

  name: {
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

  _getColor = () => {
    return colors[data[this.props.index - 1].types[0].toLowerCase() + 'Dark'] || colors.normalDark;
  };

  _goToPokemon = (index: number) => () => {
    if (index === this.props.index) {
      return;
    }

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
    const color = this._getColor();

    return (
      <ScrollView {...this.props} style={[ styles.container, this.props.style ]}>
        <Text style={[ styles.description, { color } ]}>
          {item.description}
        </Text>
        <View style={styles.evolutions}>
          <TouchableOpacity style={styles.pokemon} onPress={this._goToPokemon(1)}>
            <Image style={styles.image} source={sprites[0]} />
            <Text style={[ styles.name, { color } ]}>Bulbasaur</Text>
          </TouchableOpacity>
          <Text style={[ styles.arrow, { color } ]}>→</Text>
          <TouchableOpacity style={styles.pokemon} onPress={this._goToPokemon(2)}>
            <Image style={styles.image} source={sprites[1]} />
            <Text style={[ styles.name, { color } ]}>Ivysaur</Text>
          </TouchableOpacity>
          <Text style={[ styles.arrow, { color } ]}>→</Text>
          <TouchableOpacity style={styles.pokemon} onPress={this._goToPokemon(3)}>
            <Image style={styles.image} source={sprites[2]} />
            <Text style={[ styles.name, { color } ]}>Venusaur</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
