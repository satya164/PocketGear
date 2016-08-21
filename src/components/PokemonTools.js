/* @flow */

import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import NoResults from './NoResults';
import CPCalculator from './CPCalculator';
import type {
  Pokemon,
  PokemonID,
} from '../typeDefinitions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 16,
  },

  item: {
    marginVertical: 8,
  },
});


type Props = {
  pokemon: Pokemon;
  style?: any;
  onNavigate: Function;
}

export default class PokemonTools extends Component<void, Props, void> {

  static propTypes = {
    pokemon: PropTypes.object.isRequired,
    style: ScrollView.propTypes.style,
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

  render() {
    const { pokemon } = this.props;

    if (!pokemon.evolution_cp_multipliers) {
      return (
        <NoResults
          source={require('../../assets/images/pokegear.png')}
          label='Nothing here'
        />
      );
    }

    return (
      <ScrollView {...this.props} style={[ styles.container, this.props.style ]}>
        <View style={styles.content}>
          {pokemon.evolution_cp_multipliers ?
            <View style={styles.item}>
              <CPCalculator
                style={styles.item}
                pokemon={pokemon}
                onNavigate={this.props.onNavigate}
              />
            </View> :
            null
          }
        </View>
      </ScrollView>
    );
  }
}
