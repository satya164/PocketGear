/* @flow */

import React, { PropTypes, Component } from 'react';
import PokemonList from './PokemonList';

type Props = {
  onNavigate: Function;
}

export default class WeakAgainstList extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
  };

  render() {
    return (
      <PokemonList data={[]} onNavigate={this.props.onNavigate} />
    );
  }
}
