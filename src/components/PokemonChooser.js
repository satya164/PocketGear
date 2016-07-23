/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';
import data from '../data.json';

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
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  }
});

type State = {
  query: string;
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
  };

  _handleSearchChange = (query: string) => {
    this.setState({
      query
    });
  };

  _getSearchResults = () => {
    const { query } = this.state;

    if (query) {
      return data.filter(item => {
        return (
          item.name.toLowerCase().indexOf(query.toLowerCase()) === 0 ||
          item.types.filter(type => type.toLowerCase().indexOf(query.toLowerCase()) === 0).length ||
          item.index === parseInt(query, 10)
        );
      });
    }

    return data;
  };

  render() {
    return (
      <View style={styles.page}>
        <StatusBar backgroundColor='#ccc' />
        <PokemonList
          contentContainerStyle={styles.list}
          data={this._getSearchResults()}
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
