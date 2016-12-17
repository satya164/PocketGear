/* @flow */

import React, { PropTypes, PureComponent } from 'react';
import {
  StyleSheet,
} from 'react-native';
import GridView from './GridView';
import PokemonListCard from './PokemonListCard';
import type {
  Pokemon,
} from '../typeDefinitions';

const styles = StyleSheet.create({
  grid: {
    backgroundColor: '#fafafa',
  },
});

type Props = {
  onNavigate: Function;
  data: {
    pokemons: Array<Pokemon>;
  };
  style?: any;
}

const CARD_WIDTH = 160;

export default class PokemonList extends PureComponent<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    data: PropTypes.shape({
      pokemons: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    style: GridView.propTypes.style,
  };

  scrollTo(options: any) {
    this._root.scrollTo(options);
  }

  _root: Object;

  _renderRow = (rowData: any) => {
    return <PokemonListCard pokemon={rowData} onNavigate={this.props.onNavigate} />;
  };

  _getNumberOfColumns = (width: number) => {
    return Math.floor(width / CARD_WIDTH);
  };

  _setRef = (c: Object) => (this._root = c);

  render() {
    return (
      <GridView
        {...this.props}
        pageSize={2}
        style={[ styles.grid, this.props.style ]}
        spacing={8}
        renderRow={this._renderRow}
        getNumberOfColumns={this._getNumberOfColumns}
        ref={this._setRef}
      />
    );
  }
}
