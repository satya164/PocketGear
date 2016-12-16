/* @flow */

import difference from 'lodash/difference';
import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Heading from './Heading';
import store from '../store';
import type {
  Pokemon,
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
  pokemon: Pokemon;
  onNavigate: Function;
}

export default class Evolution extends PureComponent<void, Props, void> {

  static propTypes = {
    pokemon: PropTypes.object.isRequired,
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
    const { pokemon } = this.props;
    const evolutionChains = pokemon.evolution_chains;
    const pokemons = store.getPokemons();

    const chains = evolutionChains ? evolutionChains.map(chain =>
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
    ) : [];

    if (chains.length === 0) {
      return null;
    }

    return (
      <View {...this.props}>
        <Heading>Evolution</Heading>
        {pokemon.evolution_requirements && pokemon.evolution_requirements.name ?
          <Text style={styles.requirements}>
            {pokemon.evolution_requirements.amount} {pokemon.evolution_requirements.name}
          </Text> :
          null
        }
        {chains.map((chain, i) => (
          <View key={'outer-' + i} style={styles.container}>
            {chain.map((p, index) => (
              <TouchableOpacity
                key={p.id}
                style={styles.item}
                onPress={() => this._goToPokemon(p.id)}
              >
                <View style={styles.pokemon}>
                  <Image source={store.getSprite(p.id)} style={styles.image} />
                  <Text style={styles.label}>{p.name}</Text>
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
