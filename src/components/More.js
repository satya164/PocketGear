/* @flow */

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TouchableItem from './TouchableItem';

const styles = StyleSheet.create({
  card: {
    height: 167,
    borderRadius: 2,
    backgroundColor: '#f0f0f0',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: '#222',
  },

  more: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 9,
    color: '#222',
    marginVertical: 4,
  },
});

type Props = {
  style?: any,
};

export default function More(props: Props) {
  return (
    <TouchableItem {...props} style={[styles.card, styles.center, props.style]}>
      <View style={styles.center}>
        <View style={styles.button}>
          <MaterialIcons name="arrow-forward" size={16} style={styles.icon} />
        </View>
        <Text style={styles.more}>more</Text>
      </View>
    </TouchableItem>
  );
}
