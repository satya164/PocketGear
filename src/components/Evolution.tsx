import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import store from '../store';
import type { Pokemon, PokemonID } from '../types';
import Heading from './Heading';

type Props = {
  pokemon: Pokemon;
  style?: StyleProp<ViewStyle>;
};

function Evolution(props: Props) {
  const navigation = useNavigation();

  const goToPokemon = (pokemonId: PokemonID) => {
    navigation.navigate('Info', {
      pokemonId,
    });
  };

  const getEvolutions = (pokemon: Pokemon): Pokemon[] | undefined => {
    const { evolution } = pokemon;

    return evolution && evolution.branch
      ? (evolution.branch
          .map((ev) => store.getPokemon(ev.id))
          .filter(Boolean) as Pokemon[])
      : undefined;
  };

  const { pokemon } = props;
  const { evolution } = pokemon;

  if (!evolution) {
    return null;
  }

  const evolutions = getEvolutions(pokemon);

  const chains = (evolutions ? evolutions.map((item) => [item]) : [[pokemon]])
    .reduce<Pokemon[][]>((acc, chain) => {
      const last = chain[chain.length - 1];
      const evs = getEvolutions(last);

      if (evs) {
        const next = [...acc];
        evs.forEach((it) => next.push([...chain, it]));
        return next;
      }

      return [...acc, chain];
    }, [])
    .map((chain) => {
      let parents: Pokemon[] = [];
      let curr = chain[0];

      while (curr.evolution && curr.evolution.parent) {
        const { parent } = curr.evolution;
        const poke = store.getPokemon(parent);

        if (poke) {
          curr = poke;
          parents = [poke, ...parents];
        }
      }

      return [...parents, ...chain];
    })
    .map((chain) =>
      chain.map((poke) => {
        if (poke.evolution && poke.evolution.parent) {
          const { parent } = poke.evolution;
          const prev = store.getPokemon(parent);

          if (prev && prev.evolution && prev.evolution.branch) {
            const ev = prev.evolution.branch.find(({ id }) => id === poke.id);
            return { poke, ev };
          }
        }

        return { poke, ev: null };
      })
    );

  return (
    <View {...props}>
      <Heading>Evolution</Heading>
      <View style={styles.item}>
        {chains.map((chain, i) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key
          <View key={i} style={styles.row}>
            {chain.map(({ poke, ev }, index, self) => [
              <TouchableOpacity
                // eslint-disable-next-line @eslint-react/no-array-index-key
                key={index}
                style={styles.pokemon}
                onPress={() =>
                  poke && poke.id !== pokemon.id
                    ? goToPokemon(poke.id)
                    : undefined
                }
              >
                <Image
                  source={poke ? store.getSprite(poke.id) : undefined}
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
                  <Text style={styles.requirements}>{ev.item_requirement}</Text>
                ) : null}
              </TouchableOpacity>,
              index !== self.length - 1 ? (
                // eslint-disable-next-line @eslint-react/no-array-index-key
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

export default Evolution;
