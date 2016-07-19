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

export default class ChoosePokemon extends Component {

  state = {
    query: '',
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
        <PokeCard index={135} />
      </View>
    )
  }
}
