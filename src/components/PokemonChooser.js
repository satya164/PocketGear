/* @flow */

import find from 'lodash/find';
import filter from 'lodash/filter';
import debounce from 'lodash/debounce';
import React, { PropTypes, Component } from 'react';
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';
import NoResults from './NoResults';
import store from '../store';
import type {
  Pokemon,
} from '../typeDefinitions';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f4f4f4',
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
      backgroundColor: '#f4f4f4',
    } : null),
  },
});

type State = {
  query: string;
  results: Array<Pokemon>
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
    results: store.getPokemons(),
  };

  _getResults = (query: string) => {
    const pokemons = store.getPokemons();

    if (query) {
      if (!isNaN(query)) {
        return find(pokemons, { id: parseInt(query, 10) });
      }
      return filter(pokemons, (pokemon => {
        return (
          pokemon.name.toLowerCase().indexOf(query.toLowerCase()) === 0 ||
          pokemon.types.some(type => type.toLowerCase().indexOf(query.toLowerCase()) === 0)
        );
      }));
    }

    return pokemons;
  };

  _updateResults = debounce(() => {
    const results = this._getResults(this.state.query);
    this.setState({
      results,
    }, () => {
      if (this._list) {
        this._list.scrollTo({
          x: 0,
          y: 0,
          animated: false,
        });
      }
    });
  }, 200);

  _handleSearchChange = (query: string) => {
    if (this.state.query === query) {
      return;
    }
    this.setState({
      query,
    });
    this._updateResults();
  };

  _list: ?Object;

  _setRef = (c: Object) => (this._list = c);

  _unsetRef = () => (this._list = null);

  render() {
    return (
      <KeyboardAvoidingView style={styles.page}>
        {this.state.results.length ?
          <PokemonList
            scrollsToTop
            keyboardShouldPersistTaps
            contentContainerStyle={styles.list}
            data={this.state.results}
            onNavigate={this.props.onNavigate}
            ref={this._setRef}
          /> :
          <NoResults
            label='No Pokémon found'
            source={require('../../assets/images/open-pokeball.png')}
            ref={this._unsetRef}
          />
        }
        <View style={styles.searchbar}>
          <SearchBar
            placeholder='Find Pokémon by name, type or index'
            value={this.state.query}
            onChangeSearch={this._handleSearchChange}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
