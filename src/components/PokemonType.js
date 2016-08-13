/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../colors.json';

const styles = StyleSheet.create({

  type: {
    borderRadius: 2,
    paddingVertical: 3,
    paddingHorizontal: 6,
    margin: 2,
    height: 21,
  },

  text: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 11,
    opacity: 0.5,
  },
});

type Props = {
  type: string;
  style?: any;
}

export default function PokemonType({ type, style }: Props) {
  const color = colors[type.toLowerCase()];
  return (
    <View style={[ styles.type, { backgroundColor: color }, style ]}>
      <Text style={styles.text}>{type}</Text>
    </View>
  );
}
