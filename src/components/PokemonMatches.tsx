import React, { PureComponent } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import More from './More';
import PokemonListCard from './PokemonListCard';
import getWeakAgainstPokemons from '../utils/getWeakAgainstPokemons';
import getStrongAgainstPokemons from '../utils/getStrongAgainstPokemons';
import findClosestMatch from '../utils/findClosestMatch';
import { Pokemon, PokemonID } from '../types';

type Props = {
  pokemon: Pokemon;
  navigation: any;
};

type State = {
  containerWidth: number;
};

export default class PokemonMatches extends PureComponent<Props, State> {
  state: State = {
    containerWidth: Dimensions.get('window').width,
  };

  _goToPokemon = (pokemonId: PokemonID) => () => {
    this.props.navigation.push('Info', {
      pokemonId,
    });
  };

  _handleStrongPress = () => {
    this.props.navigation.push('StrongAgainst', {
      pokemonId: this.props.pokemon.id,
    });
  };

  _handleWeakPress = () => {
    this.props.navigation.push('WeakAgainst', {
      pokemonId: this.props.pokemon.id,
    });
  };

  _handleLayout = (e: LayoutChangeEvent) => {
    if (this.state.containerWidth === e.nativeEvent.layout.width) {
      return;
    }

    this.setState({
      containerWidth: e.nativeEvent.layout.width,
    });
  };

  render() {
    const { pokemon } = this.props;
    const { containerWidth } = this.state;
    const weakAgainstPokemons = getWeakAgainstPokemons(pokemon);
    const strongAgainstPokemons = getStrongAgainstPokemons(pokemon);

    const strongAgainstFirst: Pokemon | undefined = strongAgainstPokemons.length
      ? findClosestMatch(strongAgainstPokemons, pokemon, false)
      : undefined;

    const weakAgainstFirst: Pokemon | undefined = weakAgainstPokemons.length
      ? findClosestMatch(weakAgainstPokemons, pokemon)
      : undefined;

    const cardStyle = {
      width: (containerWidth - 8) / Math.floor(containerWidth / 160) - 8,
      margin: 4,
    };

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {strongAgainstFirst && (
          <View>
            <Text style={styles.heading}>
              Strong against ({strongAgainstPokemons.length})
            </Text>
            <View style={styles.row}>
              <PokemonListCard
                pokemon={strongAgainstFirst}
                navigation={this.props.navigation}
                style={cardStyle}
              />
              {strongAgainstPokemons.length > 1 && (
                <More onPress={this._handleStrongPress} style={cardStyle} />
              )}
            </View>
          </View>
        )}

        {weakAgainstFirst && (
          <View>
            <Text style={styles.heading}>
              Weak against ({weakAgainstPokemons.length})
            </Text>
            <View style={styles.row}>
              <PokemonListCard
                pokemon={weakAgainstFirst}
                navigation={this.props.navigation}
                style={cardStyle}
              />
              {weakAgainstPokemons.length > 1 && (
                <More onPress={this._handleWeakPress} style={cardStyle} />
              )}
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

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
