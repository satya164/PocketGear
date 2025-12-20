import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Move, PokemonType } from '../types';

type Props = {
  move: Move;
  types: PokemonType[];
};

export default function Attack({ move, types }: Props) {
  const power = move.power || 0;
  const multiplier = types.includes(move.type) ? 1.25 : 1;
  const stab = power * (multiplier - 1);

  return (
    <View style={styles.row}>
      <View style={styles.type}>
        <Text style={styles.text}>{move.name}</Text>
        <Text style={styles.subtitle}>
          {move.type} · {move.damage_class}
        </Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.damage}>
        <Text style={styles.text}>{power + stab} pow</Text>
        <Text style={[styles.subtitle, styles.numbers]}>
          {power} {stab ? <Text style={styles.stab}>+{stab} </Text> : ''}/{' '}
          {move.pp} PP
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  spacer: {
    flex: 1,
  },

  text: {
    color: '#222',
    fontFamily: 'Montserrat',
    fontSize: 13,
    lineHeight: 20,
  },

  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },

  type: {
    width: 120,
  },

  damage: {
    width: 80,
    alignItems: 'flex-end',
  },

  subtitle: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    color: '#999',
    marginVertical: 4,
  },

  numbers: {
    fontSize: 10,
  },

  stab: {
    color: '#4caf50',
  },
});
