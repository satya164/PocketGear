/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';
import SearchBar from './SearchBar';
import GridView from './GridView';
import PokeCard from './PokeCard';
import db from '../db';

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

  _renderRow = (rowData: any) => {
    return <PokeCard pokemon={rowData} onNavigate={this.props.onNavigate} />;
  };

  _getSearchResults = () => {
    const { query } = this.state;
    const pokemons = db.objects('Pokemon').sorted('id');

    if (query) {
      return pokemons
        .filtered(`name CONTAINS "${query}"`)
        .map(p => p);
    }

    return pokemons.map(p => p);
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
        <GridView
          removeClippedSubViews
          spacing={8}
          data={this._getSearchResults()}
          renderRow={this._renderRow}
          getNumberOfColumns={this._getNumberOfColumns}
        />
      </View>
    );
  }
}
