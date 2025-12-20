import difference from 'lodash/difference';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePokemon } from '../contexts/PokemonContext';
import store from '../store';
import getResistantToTypes from '../utils/getResistantToTypes';
import getStrongAgainstTypes from '../utils/getStrongAgainstTypes';
import getWeakAgainstTypes from '../utils/getWeakAgainstTypes';
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

  const maxValues = store.getMaxValues();
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

        <View style={styles.item}>
          <View style={[styles.row, styles.center]}>
            <Text
              selectable
              style={[styles.text, styles.strong, styles.measurement]}
            >
              Height
            </Text>
            <Text selectable style={styles.text}>
              {pokemon.height} m
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
              {pokemon.weight} kg
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
          {renderStat(
            'HP',
            pokemon.stats.hp / maxValues.hp,
            pokemon.stats.hp,
            '#ff8a65'
          )}
          {renderStat(
            'Attack',
            pokemon.stats.attack / maxValues.attack,
            pokemon.stats.attack,
            '#f06292'
          )}
          {renderStat(
            'Defense',
            pokemon.stats.defense / maxValues.defense,
            pokemon.stats.defense,
            '#9575cd'
          )}
          {renderStat(
            'Sp. Attack',
            pokemon.stats.special_attack / maxValues.special_attack,
            pokemon.stats.special_attack,
            '#5499c7'
          )}
          {renderStat(
            'Sp. Defense',
            pokemon.stats.special_defense / maxValues.special_defense,
            pokemon.stats.special_defense,
            '#4db6ac'
          )}
          {renderStat(
            'Speed',
            pokemon.stats.speed / maxValues.speed,
            pokemon.stats.speed,
            '#ffd54f'
          )}
          {renderStat(
            'Capture Rate',
            pokemon.capture_rate / 255,
            pokemon.capture_rate,
            '#e57373'
          )}
        </View>

        {pokemon.evolution ? (
          <View style={styles.item}>
            <Evolution style={styles.item} pokemon={pokemon} />
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
