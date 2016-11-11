/* @flow */

import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import Placeholder from './Placeholder';
import Appbar from './Appbar';
import PokemonList from './PokemonList';
import NoResults from './NoResults';
import getStrongAgainstPokemons from '../utils/getStrongAgainstPokemons';
import store from '../store';
import type {
  Pokemon,
  PokemonID,
} from '../typeDefinitions';

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

type Props = {
  pokemonId: PokemonID;
  onNavigate: Function;
}

type State = {
  data: {
    pokemons: Array<Pokemon>;
  };
  loading: boolean;
}

export default class StrongAgainstList extends PureComponent<void, Props, State> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pokemonId: PropTypes.number.isRequired,
  };

  state: State = {
    data: {
      pokemons: [],
    },
    loading: true,
  };

  componentWillMount() {
    InteractionManager.runAfterInteractions(this._updateData);
  }

  _updateData = () => {
    const pokemon = store.getPokemons().find(p => p.id === this.props.pokemonId);
    if (!pokemon) {
      return;
    }
    const pokemons = getStrongAgainstPokemons(pokemon);
    this.setState({
      data: { pokemons },
      loading: false,
    });
  };

  render() {
    const pokemon = store.getPokemons().find(p => p.id === this.props.pokemonId);
    if (!pokemon) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Appbar onNavigate={this.props.onNavigate}>
          <Text style={styles.title}>{pokemon.name}</Text>
          <Text style={styles.subtitle}>Strong against</Text>
        </Appbar>
        <View style={styles.content}>
          {this.state.loading ?
            <Placeholder style={styles.container} /> :
            this.state.data.pokemons.length ?
              <PokemonList data={this.state.data} onNavigate={this.props.onNavigate} /> :
              <NoResults
                source={require('../../assets/images/chansey.png')}
                label={`${pokemon.name} seems weak`}
              />
          }
        </View>
      </View>
    );
  }
}
