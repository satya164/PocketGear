/* @flow */

import React, { PropTypes, Component } from 'react';
import GridView from './GridView';
import PokemonListCard from './PokemonListCard';

type Props = {
  onNavigate: Function;
  data: any;
}

export default class PokemonList extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  _renderRow = (rowData: any) => {
    return <PokemonListCard index={rowData.index} onNavigate={this.props.onNavigate} />;
  };

  _getNumberOfColumns = (width: number) => {
    return Math.floor(width / 160);
  };

  render() {
    return (
      <GridView
        {...this.props}
        spacing={8}
        renderRow={this._renderRow}
        getNumberOfColumns={this._getNumberOfColumns}
      />
    );
  }
}
