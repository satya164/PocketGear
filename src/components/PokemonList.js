/* @flow */

import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {
  Platform,
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
  data: Array<Pokemon>;
  style?: any;
}

export default class PokemonList extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    style: GridView.propTypes.style,
  };

  shouldComponentUpdate(nextProps: Props, nextState: void) {
    return shallowCompare(this, nextProps, nextState);
  }

  scrollTo(options: any) {
    this._root.scrollTo(options);
  }

  _root: Object;

  _renderRow = (rowData: any) => {
    return <PokemonListCard pokemon={rowData} onNavigate={this.props.onNavigate} />;
  };

  _getNumberOfColumns = (width: number) => {
    return Math.floor(width / 160);
  };

  _setRef = (c: Object) => (this._root = c);

  render() {
    return (
      <GridView
        {...this.props}
        style={[ styles.grid, this.props.style ]}
        spacing={Platform.OS === 'ios' ? 10 : 8}
        renderRow={this._renderRow}
        getNumberOfColumns={this._getNumberOfColumns}
        ref={this._setRef}
      />
    );
  }
}
