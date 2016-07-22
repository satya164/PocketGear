/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';
import data from '../data.json';

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

type Props = {
  onNavigate: Function;
}

export default class PokemonChooser extends Component<void, Props, State> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
  };

  state: State = {
    query: '',
    selected: null,
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

  _getNumberOfColumns = (width: number) => {
    return Math.floor(width / 160);
  };

  render() {
    return (
      <View style={styles.page}>
        <StatusBar backgroundColor='#ccc' />
        <SearchBar
          placeholder='Find Pokémon by name, type or index'
          value={this.state.query}
          onChangeSearch={this._handleSearchChange}
        />
        <PokemonList data={this._getSearchResults()} onNavigate={this.props.onNavigate} />
      </View>
    );
  }
}
