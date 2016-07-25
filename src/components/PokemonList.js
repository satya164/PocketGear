/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';
import GridView from './GridView';
import PokemonListCard from './PokemonListCard';

const styles = StyleSheet.create({
  grid: {
    backgroundColor: '#f6f6f6',
  },
});

type Props = {
  onNavigate: Function;
  data: any;
  style?: any;
}

export default class PokemonList extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    style: GridView.propTypes.style,
  };

  _renderRow = (rowData: any) => {
    return <PokemonListCard pokemon={rowData} onNavigate={this.props.onNavigate} />;
  };

  _getNumberOfColumns = (width: number) => {
    return Math.floor(width / 160);
  };

  render() {
    return (
      <GridView
        {...this.props}
        style={[ styles.grid, this.props.style ]}
        spacing={Platform.OS === 'ios' ? 10 : 8}
        renderRow={this._renderRow}
        getNumberOfColumns={this._getNumberOfColumns}
      />
    );
  }
}
