import React, { PureComponent } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import GridView from './GridView';
import PokemonListCard from './PokemonListCard';
import { Pokemon } from '../types';

type Props = {
  navigation: any;
  data: Pokemon[];
  style?: StyleProp<ViewStyle>;
};

const CARD_WIDTH = 160;

export default class PokemonList extends PureComponent<Props> {
  scrollTo(options: any) {
    this._root.scrollTo(options);
  }

  _root: any;

  _renderRow = (rowData: any) => {
    return (
      <PokemonListCard pokemon={rowData} navigation={this.props.navigation} />
    );
  };

  _getNumberOfColumns = (width: number) => {
    return Math.floor(width / CARD_WIDTH);
  };

  _setRef = (c: any) => (this._root = c);

  render() {
    return (
      <GridView
        {...this.props}
        pageSize={2}
        style={[styles.grid, this.props.style]}
        spacing={8}
        renderRow={this._renderRow}
        getNumberOfColumns={this._getNumberOfColumns}
        ref={this._setRef}
      />
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    backgroundColor: '#fafafa',
  },
});
