/* @flow */

import difference from 'lodash/difference';
import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import sprites from '../sprites';
import store from '../store';
import type {
  PokemonID,
} from '../typeDefinitions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },

  image: {
    marginVertical: 8,
    height: 48,
    width: 64,
    resizeMode: 'contain',
  },

  title: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
  },

  requirements: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#222',
    marginVertical: 8,
  },

  label: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    color: '#222',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },

  pokemon: {
    alignItems: 'center',
  },

  arrow: {
    margin: 8,
    marginBottom: 21,
    fontSize: 16,
    color: '#000',
    opacity: 0.5,
  },
});

type Props = {
  evolutionChains: Array<Array<PokemonID>>;
  evolutionRequirements: ?{ amount: number; name: string; };
  onNavigate: Function;
}

export default class Evolution extends Component<void, Props, void> {

  static propTypes = {
    evolutionChains: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    evolutionRequirements: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
  };

  _goToPokemon = (pokemonId: PokemonID) => {
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
    const {
      evolutionChains,
      evolutionRequirements,
    } = this.props;
    const pokemons = store.getPokemons();

    const chains = evolutionChains.map(chain =>
      // Remove Pokemons from a newer generation
      chain.filter(id =>
        pokemons[id - 1]
      )
    )
    .filter(it => it.length > 1)
    // Remove evolution chains which are subset of another
    // Will happen when we remove pokemons from newer generation
    .filter((it, i, self) => {
      const items = self.filter(c => c !== it);
      if (items.length === 0) {
        return true;
      }
      return items.some(c =>
        difference(it, c).length
      );
    })
    .map(chain =>
      chain.map(id =>
        pokemons[id - 1]
      )
    );

    if (chains.length === 0) {
      return null;
    }

    return (
      <View {...this.props}>
        <Text style={styles.title}>Evolution</Text>
        {evolutionRequirements ?
          <Text style={styles.requirements}>
            {evolutionRequirements.amount} {evolutionRequirements.name}
          </Text> :
          null
        }
        {chains.map((chain, i) => (
          <View key={'outer-' + i} style={styles.container}>
            {chain.map((pokemon, index) => (
              <TouchableOpacity
                key={pokemon.id}
                style={styles.item}
                onPress={() => this._goToPokemon(pokemon.id)}
              >
                <View style={styles.pokemon}>
                  <Image source={sprites[pokemon.id - 1]} style={styles.image} />
                  <Text style={styles.label}>{pokemon.name}</Text>
                </View>
                {index !== chain.length - 1 ?
                  <Text style={styles.arrow}>→</Text> :
                  null
                }
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  }
}
