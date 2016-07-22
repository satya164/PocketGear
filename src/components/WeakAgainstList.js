/* @flow */

import React, { PropTypes, Component } from 'react';
import PokemonList from './PokemonList';
import data from '../data.json';

type Props = {
  onNavigate: Function;
}

export default class WeakAgainstList extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
  };

  render() {
    return (
      <PokemonList data={[ data[3], data[4], data[5] ]} onNavigate={this.props.onNavigate} />
    );
  }
}
