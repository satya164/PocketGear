/* @flow */

import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {
  Text,
  View,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import GridView from './GridView';
import More from './More';
import PokemonListCard from './PokemonListCard';
import getWeakAgainstPokemons from '../helpers/getWeakAgainstPokemons';
import getStrongAgainstPokemons from '../helpers/getStrongAgainstPokemons';
import findClosestMatch from '../helpers/findClosestMatch';
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
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 11,
    opacity: 0.5,
    marginHorizontal: 8,
  },

  section: {
    marginTop: 16,
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

export default class PokemonMatches extends Component<void, Props, void> {

  static propTypes = {
    pokemon: PropTypes.object.isRequired,
    style: GridView.propTypes.style,
    onNavigate: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps: Props, nextState: void) {
    return shallowCompare(this, nextProps, nextState);
  }

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

  _renderRow = (rowData: RowData) => {
    switch (rowData.type) {
    case 'pokemon': {
      return <PokemonListCard pokemon={rowData.pokemon} onNavigate={this.props.onNavigate} />;
    }
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

    const strongAgainstData: ?Array<RowData> = strongAgainstPokemons.length ? [
      { type: 'pokemon', pokemon: findClosestMatch(strongAgainstPokemons, pokemon, false) },
    ] : null;
    if (strongAgainstData && strongAgainstPokemons.length > 1) {
      strongAgainstData.push({ type: 'more', strongAgainst: true });
    }
    const weakAgainstData: ?Array<RowData> = weakAgainstPokemons.length ? [
      { type: 'pokemon', pokemon: findClosestMatch(weakAgainstPokemons, pokemon) },
    ] : null;
    if (weakAgainstData && weakAgainstPokemons.length > 1) {
      weakAgainstData.push({ type: 'more' });
    }

    return (
      <ScrollView {...this.props} style={[ styles.container, this.props.style ]}>
        {strongAgainstData ?
          <View style={styles.section}>
            <Text style={styles.heading}>Strong against ({strongAgainstPokemons.length})</Text>
            <GridView
              data={strongAgainstData}
              spacing={Platform.OS === 'ios' ? 10 : 8}
              renderRow={this._renderRow}
              getNumberOfColumns={this._getNumberOfColumns}
              scrollEnabled={false}
            />
          </View> :
          null
        }
        {weakAgainstData ?
          <View style={styles.section}>
            <Text style={styles.heading}>Weak against ({weakAgainstPokemons.length})</Text>
            <GridView
              {...this.props}
              data={weakAgainstData}
              spacing={Platform.OS === 'ios' ? 10 : 8}
              renderRow={this._renderRow}
              getNumberOfColumns={this._getNumberOfColumns}
              scrollEnabled={false}
            />
          </View> :
          null
        }
      </ScrollView>
    );
  }
}
