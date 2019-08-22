import * as React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import store from '../store';
import { PokemonType } from '../types';

type Props = {
  type: PokemonType;
  style?: StyleProp<ViewStyle>;
};

export default function PokemonTypeLabel({ type, style }: Props) {
  const color = store.getColor(type);
  return (
    <View style={[styles.type, { backgroundColor: color }, style]}>
      <Text style={styles.text}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  type: {
    borderRadius: 2,
    paddingVertical: 3,
    paddingHorizontal: 6,
    margin: 1,
    height: 20,
  },

  text: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    opacity: 0.5,
  },
});
