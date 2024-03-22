import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Placeholder() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
