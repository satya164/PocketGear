/* @flow */

import React, { PropTypes, Component } from 'react';
import PokemonList from './PokemonList';
import data from '../data.json';

type Props = {
  onNavigate: Function;
}

export default class StrongAgainstList extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
  };

  render() {
    return (
      <PokemonList data={[ data[6], data[7], data[8], data[42], data[45] ]} onNavigate={this.props.onNavigate} />
    );
  }
}
