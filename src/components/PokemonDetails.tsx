import difference from 'lodash/difference';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePokemon } from '../contexts/PokemonContext';
import store from '../store';
import type { Move } from '../types';
import getQuickAttacks from '../utils/getQuickAttacks';
import getResistantToTypes from '../utils/getResistantToTypes';
import getSpecialAttacks from '../utils/getSpecialAttacks';
import getStrongAgainstTypes from '../utils/getStrongAgainstTypes';
import getWeakAgainstTypes from '../utils/getWeakAgainstTypes';
import Attack from './Attack';
import Evolution from './Evolution';
import Heading from './Heading';
import Paragraph from './Paragraph';
import PokemonTypeLabel from './PokemonTypeLabel';
import ProgressBar from './ProgressBar';

function PokemonDetails() {
  const pokemon = usePokemon();

  const renderStat = (
    type: string,
    ratio: number,
    amount: string | number,
    fill: string
  ) => {
    return (
      <View style={[styles.row, styles.center]}>
        <Text style={[styles.text, styles.label]}>{type}</Text>
        <ProgressBar ratio={ratio || 0} fillColor={fill} />
        <Text style={[styles.text, styles.amount]}>{amount}</Text>
      </View>
    );
  };

  const renderAttack = (move: Move) => {
    return <Attack key={move.name} move={move} types={pokemon.types} />;
  };

  const maxValues = store.getMaxValues();
  const quickAttacks = getQuickAttacks(pokemon);
  const specialAttacks = getSpecialAttacks(pokemon);
  const strongAgainstAll = getStrongAgainstTypes(pokemon);
  const weakAgainstAll = getWeakAgainstTypes(pokemon);
  const resistantToAll = getResistantToTypes(pokemon);
  const strongAgainst = difference(strongAgainstAll, weakAgainstAll);
  const weakAgainst = difference(weakAgainstAll, strongAgainstAll);
  const resistantTo = difference(resistantToAll, [
    ...weakAgainst,
    ...strongAgainst,
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.item}>
          <Heading selectable>{pokemon.category}</Heading>
          <Paragraph>{pokemon.description}</Paragraph>
        </View>

        <View style={styles.origin}>
          {pokemon.name_origin.map(({ term, meaning }) => (
            <Paragraph style={styles.term} key={term}>
              <Text style={[styles.text, styles.strong]}>{term}</Text>
              <Text>{'    '}</Text>
              <Text>{meaning}</Text>
            </Paragraph>
          ))}
        </View>

        {pokemon.egg_distance || pokemon.buddy_distance ? (
          <View style={styles.item}>
            {pokemon.egg_distance ? (
              <View style={[styles.row, styles.center]}>
                <Text
                  selectable
                  style={[styles.text, styles.strong, styles.measurement]}
                >
                  Egg Group
                </Text>
                <Text selectable style={styles.text}>
                  {pokemon.egg_distance.amount} {pokemon.egg_distance.unit}
                </Text>
              </View>
            ) : null}
            {pokemon.buddy_distance ? (
              <View style={[styles.row, styles.center]}>
                <Text
                  selectable
                  style={[styles.text, styles.strong, styles.measurement]}
                >
                  Buddy Distance
                </Text>
                <Text selectable style={styles.text}>
                  {pokemon.buddy_distance.amount} {pokemon.buddy_distance.unit}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}

        <View style={styles.item}>
          <View style={[styles.row, styles.center]}>
            <Text
              selectable
              style={[styles.text, styles.strong, styles.measurement]}
            >
              Height
            </Text>
            <Text selectable style={styles.text}>
              {pokemon.measurements.height.amount}{' '}
              {pokemon.measurements.height.unit}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text
              selectable
              style={[styles.text, styles.strong, styles.measurement]}
            >
              Weight
            </Text>
            <Text selectable style={styles.text}>
              {pokemon.measurements.weight.amount}{' '}
              {pokemon.measurements.weight.unit}
            </Text>
          </View>
        </View>

        <View style={styles.item}>
          {strongAgainst.length ? (
            <View style={[styles.row, styles.item]}>
              <Text style={[styles.text, styles.label]}>Strong against</Text>
              <View style={styles.wrap}>
                {strongAgainst.map((type) => (
                  <PokemonTypeLabel key={type} type={type} />
                ))}
              </View>
            </View>
          ) : null}
          {resistantTo.length ? (
            <View style={[styles.row, styles.item]}>
              <Text style={[styles.text, styles.label]}>Resistant to</Text>
              <View style={styles.wrap}>
                {resistantTo.map((type) => (
                  <PokemonTypeLabel key={type} type={type} />
                ))}
              </View>
            </View>
          ) : null}
          {weakAgainst.length ? (
            <View style={[styles.row, styles.item]}>
              <Text style={[styles.text, styles.label]}>Weak against</Text>
              <View style={styles.wrap}>
                {weakAgainst.map((type) => (
                  <PokemonTypeLabel key={type} type={type} />
                ))}
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.item}>
          {quickAttacks.map(renderAttack)}
          {specialAttacks.map(renderAttack)}
        </View>

        <View style={styles.item}>
          {renderStat(
            'Attack',
            pokemon.stats.attack / maxValues.attack,
            pokemon.stats.attack,
            '#ff8a65'
          )}
          {renderStat(
            'Defense',
            pokemon.stats.defense / maxValues.defense,
            pokemon.stats.defense,
            '#9575cd'
          )}
          {renderStat(
            'Stamina',
            pokemon.stats.stamina / maxValues.stamina,
            pokemon.stats.stamina,
            '#5499c7'
          )}
          {renderStat(
            'Capture Rate',
            pokemon.encounter.capture_rate || 0,
            ((pokemon.encounter.capture_rate || 0) * 100).toFixed(2) + '%',
            '#f06292'
          )}
          {renderStat(
            'Flee Rate',
            pokemon.encounter.flee_rate,
            (pokemon.encounter.flee_rate * 100).toFixed(2) + '%',
            '#ffd54f'
          )}
          {renderStat(
            'Max CP',
            pokemon.points.max_cp / maxValues.max_cp,
            pokemon.points.max_cp,
            '#e57373'
          )}
        </View>

        {pokemon.evolution ? (
          <View style={styles.item}>
            <Evolution style={styles.item} pokemon={pokemon} />
          </View>
        ) : null}

        {pokemon.easter_eggs ? (
          <View style={styles.item}>
            <Heading>{pokemon.easter_eggs.length > 1 ? 'Tips' : 'Tip'}</Heading>

            {pokemon.easter_eggs.map((tip) => (
              <View key={tip}>
                <Paragraph>{tip}</Paragraph>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

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

  text: {
    color: '#222',
    fontFamily: 'Montserrat',
    fontSize: 13,
  },

  strong: {
    fontFamily: 'Montserrat-SemiBold',
  },

  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },

  origin: {
    marginVertical: 10,
  },

  term: {
    marginVertical: 2,
  },

  wrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: -4,
  },

  center: {
    alignItems: 'center',
  },

  measurement: {
    width: 120,
  },

  label: {
    width: 120,
  },

  amount: {
    textAlign: 'right',
    width: 80,
  },
});

export default PokemonDetails;
