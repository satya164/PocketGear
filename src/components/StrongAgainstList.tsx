import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, InteractionManager } from 'react-native';
import Placeholder from './Placeholder';
import Appbar from './Appbar';
import PokemonList from './PokemonList';
import NoResults from './NoResults';
import getStrongAgainstPokemons from '../utils/getStrongAgainstPokemons';
import store from '../store';
import { Pokemon } from '../types';

type Props = {
  navigation: any;
  route: any;
};

type State = {
  data: Pokemon[];
  loading: boolean;
};

export default class StrongAgainstList extends PureComponent<Props, State> {
  state: State = {
    data: [],
    loading: true,
  };

  componentWillMount() {
    InteractionManager.runAfterInteractions(this._updateData);
  }

  _updateData = () => {
    const pokemon = store
      .getPokemons()
      .find(p => p.id === this.props.route.params.pokemonId);
    if (!pokemon) {
      return;
    }
    const pokemons = getStrongAgainstPokemons(pokemon);
    this.setState({
      data: pokemons,
      loading: false,
    });
  };

  render() {
    const pokemon = store
      .getPokemons()
      .find(p => p.id === this.props.route.params.pokemonId);
    if (!pokemon) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Appbar navigation={this.props.navigation}>
          <Text style={styles.title}>{pokemon.name}</Text>
          <Text style={styles.subtitle}>Strong against</Text>
        </Appbar>
        <View style={styles.content}>
          {this.state.loading ? (
            <Placeholder />
          ) : this.state.data.length ? (
            <PokemonList
              data={this.state.data}
              navigation={this.props.navigation}
            />
          ) : (
            <NoResults
              source={require('../../assets/images/chansey.png')}
              label={`${pokemon.name} seems weak`}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  title: {
    fontFamily: 'Montserrat',
    color: '#222',
    fontSize: 15,
  },

  subtitle: {
    fontFamily: 'Montserrat',
    color: '#000',
    opacity: 0.5,
    fontSize: 11,
  },
});
