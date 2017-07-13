/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import More from './More';
import PokemonListCard from './PokemonListCard';
import getWeakAgainstPokemons from '../utils/getWeakAgainstPokemons';
import getStrongAgainstPokemons from '../utils/getStrongAgainstPokemons';
import findClosestMatch from '../utils/findClosestMatch';
import type {
  Pokemon,
  PokemonID,
} from '../types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },

  content: {
    padding: 4,
  },

  heading: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    opacity: 0.5,
    margin: 4,
    marginTop: 16,
    backgroundColor: 'transparent',
  },

  row: {
    flexDirection: 'row',
  },
});


type Props = {
  pokemon: Pokemon;
  style?: any;
  navigation: Object;
};

type State = {
  containerWidth: number,
};

export default class PokemonMatches extends PureComponent<void, Props, State> {
  state: State = {
    containerWidth: Dimensions.get('window').width,
  };

  _goToPokemon = (pokemonId: PokemonID) => () => {
    this.props.navigation.navigate('Info', {
      pokemonId,
    });
  };

  _handleStrongPress = () => {
    this.props.navigation.navigate('StrongAgainst', {
      pokemonId: this.props.pokemon.id,
    });
  };

  _handleWeakPress = () => {
    this.props.navigation.navigate('WeakAgainst', {
      pokemonId: this.props.pokemon.id,
    });
  };

  _handleLayout = e => {
    if (this.state.containerWidth === e.nativeEvent.layout.width) {
      return;
    }

    this.setState({
      containerWidth: e.nativeEvent.layout.width,
    });
  }

  render() {
    const { pokemon } = this.props;
    const { containerWidth } = this.state;
    const weakAgainstPokemons = getWeakAgainstPokemons(pokemon);
    const strongAgainstPokemons = getStrongAgainstPokemons(pokemon);

    const strongAgainstFirst: ?Pokemon = strongAgainstPokemons.length ?
      findClosestMatch(strongAgainstPokemons, pokemon, false) :
      null;

    const weakAgainstFirst: ?Pokemon = weakAgainstPokemons.length ?
      findClosestMatch(weakAgainstPokemons, pokemon) :
      null;

    const cardStyle = {
      width: ((containerWidth - 8) / Math.floor(containerWidth / 160)) - 8,
      margin: 4,
    };

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Strong against ({strongAgainstPokemons.length})</Text>
        <View style={styles.row}>
          {strongAgainstFirst && <PokemonListCard pokemon={strongAgainstFirst} navigation={this.props.navigation} style={cardStyle} />}
          {strongAgainstPokemons.length > 1 && <More onPress={this._handleStrongPress} style={cardStyle} />}
        </View>
        <Text style={styles.heading}>Weak against ({weakAgainstPokemons.length})</Text>
        <View style={styles.row}>
          {weakAgainstFirst && <PokemonListCard pokemon={weakAgainstFirst} navigation={this.props.navigation} style={cardStyle} />}
          {weakAgainstPokemons.length > 1 && <More onPress={this._handleWeakPress} style={cardStyle} />}
        </View>
      </ScrollView>
    );
  }
}
