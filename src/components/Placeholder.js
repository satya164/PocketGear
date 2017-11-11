/* @flow */

import * as React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Placeholder() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );
}
