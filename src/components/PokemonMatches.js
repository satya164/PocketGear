/* @flow */

import React, { PropTypes, PureComponent } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import GridView from './GridView';
import More from './More';
import PokemonListCard from './PokemonListCard';
import getWeakAgainstPokemons from '../utils/getWeakAgainstPokemons';
import getStrongAgainstPokemons from '../utils/getStrongAgainstPokemons';
import findClosestMatch from '../utils/findClosestMatch';
import type {
  Pokemon,
  PokemonID,
} from '../typeDefinitions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  heading: {
    color: '#000',
    fontFamily: 'MontserratBold',
    fontSize: 11,
    opacity: 0.5,
    margin: 4,
    marginTop: 16,
    backgroundColor: 'transparent',
  },
});


type Props = {
  pokemon: Pokemon;
  style?: any;
  onNavigate: Function;
}

type RowData = {
  type: 'pokemon';
  pokemon: Pokemon;
} | {
  type: 'more';
  strongAgainst?: boolean;
}

type SectionData = Array<RowData>

export default class PokemonMatches extends PureComponent<void, Props, void> {

  static propTypes = {
    pokemon: PropTypes.object.isRequired,
    style: GridView.propTypes.style,
    onNavigate: PropTypes.func.isRequired,
  };

  _goToPokemon = (pokemonId: PokemonID) => () => {
    this.props.onNavigate({
      type: 'push',
      route: {
        name: 'info',
        props: {
          pokemonId,
        },
      },
    });
  };

  _handleStrongPress = () => {
    this.props.onNavigate({
      type: 'push',
      route: {
        name: 'strong-against',
        props: {
          pokemonId: this.props.pokemon.id,
        },
      },
    });
  };

  _handleWeakPress = () => {
    this.props.onNavigate({
      type: 'push',
      route: {
        name: 'weak-against',
        props: {
          pokemonId: this.props.pokemon.id,
        },
      },
    });
  };

  _renderSectionHeader = (sectionData: SectionData, sectionID: string) => {
    return <Text style={styles.heading}>{sectionID}</Text>;
  };

  _renderRow = (rowData: RowData) => {
    switch (rowData.type) {
    case 'pokemon':
      return <PokemonListCard pokemon={rowData.pokemon} onNavigate={this.props.onNavigate} />;
    case 'more':
      return <More onPress={rowData.strongAgainst ? this._handleStrongPress : this._handleWeakPress} />;
    default:
      return null;
    }
  };

  _getNumberOfColumns = (width: number) => {
    return Math.floor(width / 160);
  };

  render() {
    const { pokemon } = this.props;
    const weakAgainstPokemons = getWeakAgainstPokemons(pokemon);
    const strongAgainstPokemons = getStrongAgainstPokemons(pokemon);

    const strongAgainstData: ?SectionData = strongAgainstPokemons.length ? [
      { type: 'pokemon', pokemon: findClosestMatch(strongAgainstPokemons, pokemon, false) },
    ] : null;
    if (strongAgainstData && strongAgainstPokemons.length > 1) {
      strongAgainstData.push({ type: 'more', strongAgainst: true });
    }
    const weakAgainstData: ?SectionData = weakAgainstPokemons.length ? [
      { type: 'pokemon', pokemon: findClosestMatch(weakAgainstPokemons, pokemon) },
    ] : null;
    if (weakAgainstData && weakAgainstPokemons.length > 1) {
      weakAgainstData.push({ type: 'more' });
    }

    const data = {};

    if (strongAgainstData) {
      data[`Strong against (${strongAgainstPokemons.length})`] = strongAgainstData;
    }

    if (weakAgainstData) {
      data[`Weak against (${weakAgainstPokemons.length})`] = weakAgainstData;
    }

    return (
      <GridView
        data={data}
        style={styles.container}
        spacing={8}
        renderRow={this._renderRow}
        renderSectionHeader={this._renderSectionHeader}
        getNumberOfColumns={this._getNumberOfColumns}
      />
    );
  }
}
