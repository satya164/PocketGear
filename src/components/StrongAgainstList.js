/* @flow */

import find from 'lodash/find';
import React, { PropTypes, Component } from 'react';
import { InteractionManager } from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';
import PokemonList from './PokemonList';
import Placeholder from './Placeholder';
import NoResults from './NoResults';
import store from '../store';
import type {
  Pokemon,
} from '../typeDefinitions';

type Props = {
  pokemon: Pokemon;
  onNavigate: Function;
}

type State = {
  pokemons: Array<Pokemon>;
  loading: boolean;
}

export default class StrongAgainstList extends Component<void, Props, State> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired,
  };

  state: State = {
    pokemons: [],
    loading: true,
  };

  componentWillMount() {
    this._updateData();
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this._setLoading);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return shallowCompare(this, nextProps, nextState);
  }

  _setLoading = () => {
    this.setState({ loading: false });
  };

  _updateData = () => {
    const { pokemon } = this.props;
    const typeDetails = find(store.getTypeChart(), ({ name }) => pokemon.types.includes(name));
    const { strengths, weaknesses } = typeDetails;
    const pokemons = store.getPokemons().filter(({ types }) => (
      types.some(t => strengths.includes(t)) && !types.some(t => weaknesses.includes(t))
    ))
    .filter(({ attack }) => pokemon.attack > attack)
    .sort((a, b) => a.attack - b.attack);

    this.setState({ pokemons });
  };

  render() {
    if (this.state.loading) {
      return <Placeholder />;
    }

    if (this.state.pokemons.length === 0) {
      return (
        <NoResults
          source={require('../../assets/images/chansey.png')}
          label={`${this.props.pokemon.name} seems weak`}
        />
      );
    }


    return (
      <PokemonList data={this.state.pokemons} onNavigate={this.props.onNavigate} />
    );
  }
}
