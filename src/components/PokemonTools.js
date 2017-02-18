/* @flow */

import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import NoResults from './NoResults';
import CPCalculator from './CPCalculator';
import type {
  Pokemon,
  PokemonID,
} from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 16,
  },

  item: {
    marginVertical: 16,
  },
});


type Props = {
  pokemon: Pokemon;
  style?: any;
  navigation: Object;
}

export default class PokemonTools extends PureComponent<void, Props, void> {

  static propTypes = {
    pokemon: PropTypes.object.isRequired,
    style: ScrollView.propTypes.style,
    navigation: PropTypes.object.isRequired,
  };

  _goToPokemon = (pokemonId: PokemonID) => () => {
    this.props.navigation.navigate('Info', {
      pokemonId,
    });
  };

  render() {
    return (
      <ScrollView {...this.props} style={[ styles.container, this.props.style ]}>
        <View style={styles.content}>
          <CPCalculator
            style={styles.item}
            pokemon={this.props.pokemon}
            navigation={this.props.navigation}
          />
        </View>
      </ScrollView>
    );
  }
}
