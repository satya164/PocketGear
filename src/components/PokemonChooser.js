/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import SearchBar from './SearchBar';
import PokeCard from './PokeCard';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});

type State = {
  query: string;
  selected: ?number;
}

export default class PokemonChooser extends Component<void, void, State> {

  state: State = {
    query: '',
    selected: 135,
  };

  _handleSearchChange = (query: string) => {
    this.setState({
      query
    });
  };

  render() {
    return (
      <View style={styles.page}>
        <SearchBar placeholder='Find a Pokémon' onChangeText={this._handleSearchChange} />
        <PokeCard index={this.state.selected} />
      </View>
    )
  }
}
