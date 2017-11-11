/* @flow */

import React, { PureComponent } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Heading from './Heading';
import store from '../store';
import type { Pokemon, PokemonID } from '../types';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  image: {
    marginVertical: 8,
    height: 48,
    width: 64,
    resizeMode: 'contain',
  },

  arrow: {
    fontSize: 24,
    marginHorizontal: 16,
    marginTop: 24,
  },

  requirements: {
    fontFamily: 'Montserrat',
    fontSize: 9,
    color: '#222',
    margin: 2,
  },

  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: '#222',
  },

  pokemon: {
    alignItems: 'center',
    marginVertical: 8,
  },

  item: {
    marginVertical: 8,
  },

  candy: {
    height: 10,
    width: 10,
    margin: 2,
    marginLeft: 0,
  },
});

type Props = {
  pokemon: Pokemon,
  navigation: Object,
};

export default class Evolution extends PureComponent<Props, void> {
  _goToPokemon = (pokemonId: PokemonID) => {
    this.props.navigation.navigate('Info', {
      pokemonId,
    });
  };

  _getEvolutions = (pokemon: Pokemon): ?Array<Pokemon> => {
    const pokemons = store.getPokemons();
    const { evolution } = pokemon;

    return evolution && evolution.branch
      ? evolution.branch
          .map(ev =>
            /* $FlowFixMe */
            pokemons.find(p => p.id === ev.id)
          )
          .filter(ev => ev)
      : null;
  };

  render() {
    const pokemons = store.getPokemons();
    const { pokemon } = this.props;
    const { evolution } = pokemon;

    if (!evolution) {
      return null;
    }

    const evolutions = this._getEvolutions(pokemon);

    let chains = evolutions ? evolutions.map(item => [item]) : [[pokemon]];

    chains = chains
      .reduce((acc, chain) => {
        const last = chain[chain.length - 1];
        const evs = this._getEvolutions(last);

        if (evs) {
          const next = [...acc];
          evs.forEach(it => next.push([...chain, it]));
          return next;
        }

        return [...acc, chain];
      }, [])
      .map(chain => {
        let parents: Array<Pokemon> = [];
        let curr = chain[0];

        while (curr.evolution && curr.evolution.parent) {
          const { parent } = curr.evolution;
          const poke = pokemons.find(p => p.id === parent); // eslint-disable-line no-loop-func
          if (poke) {
            curr = poke;
            parents = [poke, ...parents];
          }
        }

        return [...parents, ...chain];
      })
      .map(chain =>
        chain.map(poke => {
          if (poke.evolution && poke.evolution.parent) {
            const { parent } = poke.evolution;
            const prev = pokemons.find(p => p.id === parent);

            if (prev && prev.evolution && prev.evolution.branch) {
              const ev = prev.evolution.branch.find(({ id }) => id === poke.id);
              return { poke, ev };
            }
          }

          return { poke, ev: null };
        })
      );

    return (
      <View {...this.props}>
        <Heading>Evolution</Heading>
        <View style={styles.item}>
          {chains.map((chain, i) => (
            <View key={i} style={styles.row}>
              {chain.map(({ poke, ev }, index, self) => [
                <TouchableOpacity
                  key={index}
                  style={styles.pokemon}
                  onPress={() =>
                    poke && poke.id !== pokemon.id
                      ? this._goToPokemon(poke.id)
                      : undefined
                  }
                >
                  <Image
                    source={poke ? store.getSprite(poke.id) : ''}
                    style={styles.image}
                  />
                  <Text style={styles.label}>{poke ? poke.name : ''}</Text>
                  {ev ? (
                    <View style={styles.row}>
                      <Image
                        source={require('../../assets/images/candy.png')}
                        style={styles.candy}
                      />
                      <Text style={styles.requirements}>{ev.candy_cost}</Text>
                    </View>
                  ) : null}
                  {ev && ev.item_requirement ? (
                    <Text style={styles.requirements}>
                      {ev.item_requirement}
                    </Text>
                  ) : null}
                </TouchableOpacity>,
                index !== self.length - 1 ? (
                  <Text key={`arrow-${index}`} style={styles.arrow}>
                    →
                  </Text>
                ) : null,
              ])}
            </View>
          ))}
        </View>
      </View>
    );
  }
}
