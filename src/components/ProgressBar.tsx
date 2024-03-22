import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

type Props = {
  ratio: number;
  fillColor?: string;
  style?: StyleProp<ViewStyle>;
};

function ProgressBar({ ratio, fillColor = '#FB6B6F', style }: Props) {
  return (
    <View style={[styles.bar, styles.round, style]}>
      <View
        style={[{ flex: ratio, backgroundColor: fillColor }, styles.round]}
      />
      <View style={{ flex: 1 - ratio }} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: 'row',
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, .06)',
  },
  round: {
    borderRadius: 2,
  },
});

export default ProgressBar;
