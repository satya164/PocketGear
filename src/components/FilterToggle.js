/* @flow */

import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  toggle: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginVertical: 8,
    marginHorizontal: 6,
  },

  active: {
    backgroundColor: '#222',
  },

  label: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    color: '#222',
  },

  activeLabel: {
    color: '#fff',
  },
});

type Props = {
  active: boolean;
  label: string;
  onPress: Function;
}

export default function NoResults({ active, label, onPress }: Props) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[ styles.toggle, active && styles.active ]}>
        <Text style={[ styles.label, active && styles.activeLabel ]}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
