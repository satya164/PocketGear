/* @flow */

import find from 'lodash/find';
import filter from 'lodash/filter';
import React, { PropTypes, Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';
import store from '../store';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },

  list: {
    paddingTop: Platform.OS === 'ios' ? 64 : 60,
  },

  searchbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...(Platform.OS === 'ios' ? {
      paddingTop: 20,
      backgroundColor: '#f6f6f6',
    } : null),
  },
});

type State = {
  query: string;
  atTop: boolean;
}

type Props = {
  onNavigate: Function;
}

export default class PokemonChooser extends Component<void, Props, State> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
  };

  state: State = {
    query: '',
    atTop: true,
  };

  _handleSearchChange = (query: string) => {
    this.setState({
      query,
    });
  };

  _getSearchResults = () => {
    const { query } = this.state;
    const pokemons = store.getPokemons();

    if (query) {
      if (!isNaN(query)) {
        return find(pokemons, { id: parseInt(query, 10) });
      }
      return filter(pokemons, (pokemon => pokemon.name.indexOf(query) === 0));
    }

    return pokemons;
  };

  render() {
    const pokemons = this._getSearchResults();
    return (
      <View style={styles.page}>
        <StatusBar backgroundColor='#ccc' />
        <PokemonList
          contentContainerStyle={styles.list}
          data={pokemons}
          onNavigate={this.props.onNavigate}
        />
        <View style={styles.searchbar}>
          <SearchBar
            placeholder='Find Pokémon by name, type or index'
            value={this.state.query}
            onChangeSearch={this._handleSearchChange}
          />
        </View>
      </View>
    );
  }
}
